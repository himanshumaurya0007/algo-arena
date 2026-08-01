using AlgoArena.Application.Features.Problems.Interfaces;
using AlgoArena.Domain.Entities.Problems;
using AlgoArena.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace AlgoArena.Persistence.Repositories.Problems
{
    /// <summary>
    /// Repository implementation for Problem entity.
    /// </summary>
    public sealed class ProblemRepository : IProblemRepository
    {
        private readonly AlgoArenaDbContext _dbContext;

        public ProblemRepository(AlgoArenaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        /// Retrieves all non-deleted problems.
        /// </summary>
        public async Task<IReadOnlyList<Problem>> GetAllAsync(
            CancellationToken cancellationToken)
        {
            return await _dbContext.Problems
                .AsNoTracking()
                .Where(problem => !problem.IsDeleted)
                .Include(problem => problem.ProgrammingDomain)
                .Include(problem => problem.DifficultyLevel)
                .OrderBy(problem => problem.Title)
                .ToListAsync(cancellationToken);
        }

        /// <summary>
        /// Retrieves a single problem by Id.
        /// </summary>
        public async Task<Problem?> GetByIdAsync(
     Guid id,
     CancellationToken cancellationToken)
        {
            return await _dbContext.Problems
                .Include(problem => problem.ProgrammingDomain)
                .Include(problem => problem.DifficultyLevel)
                .Include(problem => problem.ProblemTags)
                    .ThenInclude(problemTag => problemTag.Tag)
                .Include(problem => problem.ProblemExamples)
                .Include(problem => problem.ProblemTestCases)
                .Include(problem => problem.ProblemBoilerplates)
                    .ThenInclude(boilerplate => boilerplate.ProgrammingLanguage)
                .FirstOrDefaultAsync(
                    problem =>
                        problem.Id == id &&
                        !problem.IsDeleted,
                    cancellationToken);
        }


        /// <summary>
        /// Retrieves all published non-deleted problems for learner-facing pages.
        /// </summary>
        public async Task<IReadOnlyList<Problem>> GetPublishedAsync(
            CancellationToken cancellationToken)
        {
            return await _dbContext.Problems
                .AsNoTracking()
                .Where(problem =>
                    !problem.IsDeleted &&
                    problem.IsPublished)
                .Include(problem => problem.ProgrammingDomain)
                .Include(problem => problem.DifficultyLevel)
                .Include(problem => problem.ProblemTags)
                    .ThenInclude(problemTag => problemTag.Tag)
                .Include(problem => problem.ProblemArticles)
                .Include(problem => problem.ProblemVideos)
                .OrderBy(problem => problem.Title)
                .ToListAsync(cancellationToken);
        }

        /// <summary>
        /// Retrieves one published non-deleted problem by slug for the solving page.
        /// </summary>
        public async Task<Problem?> GetBySlugAsync(
            string slug,
            CancellationToken cancellationToken)
        {
            slug = slug.Trim().ToLowerInvariant();

            return await _dbContext.Problems
                .AsNoTracking()
                .Where(problem =>
                    !problem.IsDeleted &&
                    problem.IsPublished &&
                    problem.Slug == slug)
                .Include(problem => problem.ProgrammingDomain)
                .Include(problem => problem.DifficultyLevel)
                .Include(problem => problem.ProblemTags)
                    .ThenInclude(problemTag => problemTag.Tag)
                .Include(problem => problem.ProblemExamples)
                .Include(problem => problem.ProblemHints)
                .Include(problem => problem.ProblemBoilerplates)
                    .ThenInclude(boilerplate => boilerplate.ProgrammingLanguage)
                .Include(problem => problem.ProblemArticles)
                .Include(problem => problem.ProblemVideos)
                .Include(problem => problem.ProblemTestCases)
                .FirstOrDefaultAsync(cancellationToken);
        }

        /// <summary>
        /// Determines whether a slug already exists.
        /// </summary>
        public async Task<bool> ExistsAsync(
            string slug,
            CancellationToken cancellationToken)
        {
            slug = slug.Trim().ToLowerInvariant();

            return await _dbContext.Problems
                .AnyAsync(
                    problem =>
                        problem.Slug == slug &&
                        !problem.IsDeleted,
                    cancellationToken);
        }

        /// <summary>
        /// Adds a new problem.
        /// </summary>
        public async Task AddAsync(
            Problem problem,
            CancellationToken cancellationToken)
        {
            await _dbContext.Problems.AddAsync(problem, cancellationToken);

            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        /// <summary>
        /// Updates an existing problem.
        /// </summary>
        public async Task UpdateAsync(
            Problem problem,
            CancellationToken cancellationToken)
        {
            var problemId = problem.Id;

            var problemTags = problem.ProblemTags
                .Select(problemTag => new ProblemTag
                {
                    ProblemId = problemId,
                    TagId = problemTag.TagId
                })
                .ToList();

            var problemExamples = problem.ProblemExamples
                .Select(example => new ProblemExample
                {
                    Id = example.Id,
                    ProblemId = problemId,
                    DisplayOrder = example.DisplayOrder,
                    Input = example.Input,
                    Output = example.Output,
                    Explanation = example.Explanation
                })
                .ToList();

            var problemTestCases = problem.ProblemTestCases
                .Select(testCase => new ProblemTestCase
                {
                    Id = testCase.Id,
                    ProblemId = problemId,
                    DisplayOrder = testCase.DisplayOrder,
                    Input = testCase.Input,
                    ExpectedOutput = testCase.ExpectedOutput,
                    IsHidden = testCase.IsHidden
                })
                .ToList();

            var problemBoilerplates = problem.ProblemBoilerplates
                .Select(boilerplate => new ProblemBoilerplate
                {
                    Id = boilerplate.Id,
                    ProblemId = problemId,
                    ProgrammingLanguageId = boilerplate.ProgrammingLanguageId,
                    TemplateCode = boilerplate.TemplateCode
                })
                .ToList();

            DetachTrackedProblemChildren(problemId);

            await _dbContext.ProblemTags
                .Where(problemTag => problemTag.ProblemId == problemId)
                .ExecuteDeleteAsync(cancellationToken);

            await _dbContext.ProblemExamples
                .Where(example => example.ProblemId == problemId)
                .ExecuteDeleteAsync(cancellationToken);

            await _dbContext.ProblemTestCases
                .Where(testCase => testCase.ProblemId == problemId)
                .ExecuteDeleteAsync(cancellationToken);

            await _dbContext.ProblemBoilerplates
                .Where(boilerplate => boilerplate.ProblemId == problemId)
                .ExecuteDeleteAsync(cancellationToken);

            await _dbContext.ProblemTags
                .AddRangeAsync(problemTags, cancellationToken);

            await _dbContext.ProblemExamples
                .AddRangeAsync(problemExamples, cancellationToken);

            await _dbContext.ProblemTestCases
                .AddRangeAsync(problemTestCases, cancellationToken);

            await _dbContext.ProblemBoilerplates
                .AddRangeAsync(problemBoilerplates, cancellationToken);

            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        private void DetachTrackedProblemChildren(Guid problemId)
        {
            foreach (var entry in _dbContext.ChangeTracker
                .Entries<ProblemTag>()
                .Where(entry => entry.Entity.ProblemId == problemId)
                .ToList())
            {
                entry.State = EntityState.Detached;
            }

            foreach (var entry in _dbContext.ChangeTracker
                .Entries<ProblemExample>()
                .Where(entry => entry.Entity.ProblemId == problemId)
                .ToList())
            {
                entry.State = EntityState.Detached;
            }

            foreach (var entry in _dbContext.ChangeTracker
                .Entries<ProblemTestCase>()
                .Where(entry => entry.Entity.ProblemId == problemId)
                .ToList())
            {
                entry.State = EntityState.Detached;
            }

            foreach (var entry in _dbContext.ChangeTracker
                .Entries<ProblemBoilerplate>()
                .Where(entry => entry.Entity.ProblemId == problemId)
                .ToList())
            {
                entry.State = EntityState.Detached;
            }
        }

        /// <summary>
        /// Soft deletes a problem.
        /// </summary>
        public async Task SoftDeleteAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            var problem = await _dbContext.Problems
                .FirstOrDefaultAsync(
                    problem => problem.Id == id,
                    cancellationToken);

            if (problem is null)
            {
                throw new KeyNotFoundException($"Problem '{id}' was not found.");
            }

            problem.IsDeleted = true;
            problem.DeletedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        /// <summary>
        /// Publishes or unpublishes a problem.
        /// </summary>
        public async Task PublishAsync(
            Guid id,
            bool isPublished,
            CancellationToken cancellationToken)
        {
            var problem = await _dbContext.Problems
                .FirstOrDefaultAsync(
                    problem => problem.Id == id,
                    cancellationToken);

            if (problem is null)
            {
                throw new KeyNotFoundException($"Problem '{id}' was not found.");
            }

            problem.IsPublished = isPublished;
            problem.UpdatedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
