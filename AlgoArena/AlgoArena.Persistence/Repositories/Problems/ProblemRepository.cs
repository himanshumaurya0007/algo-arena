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
                .FirstOrDefaultAsync(
                    problem =>
                        problem.Id == id &&
                        !problem.IsDeleted,
                    cancellationToken);
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
            _dbContext.Problems.Update(problem);

            await _dbContext.SaveChangesAsync(cancellationToken);
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