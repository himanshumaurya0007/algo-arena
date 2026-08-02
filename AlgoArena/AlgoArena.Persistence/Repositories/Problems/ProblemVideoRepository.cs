using AlgoArena.Application.Features.Problems.Interfaces;
using AlgoArena.Domain.Entities.Problems;
using AlgoArena.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace AlgoArena.Persistence.Repositories.Problems
{
    public sealed class ProblemVideoRepository : IProblemVideoRepository
    {
        private readonly AlgoArenaDbContext _dbContext;

        public ProblemVideoRepository(AlgoArenaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IReadOnlyList<ProblemVideo>> GetAllAsync(
            CancellationToken cancellationToken)
        {
            return await _dbContext.ProblemVideos
                .AsNoTracking()
                .Include(video => video.Problem)
                .Where(video =>
                    !video.IsDeleted &&
                    !video.Problem.IsDeleted)
                .OrderBy(video => video.Problem.Title)
                .ThenBy(video => video.DisplayOrder)
                .ToListAsync(cancellationToken);
        }

        public async Task<IReadOnlyList<ProblemVideo>> GetPublishedAsync(
    CancellationToken cancellationToken)
        {
            return await _dbContext.ProblemVideos
                .AsNoTracking()
                .Include(video => video.Problem)
                    .ThenInclude(problem => problem.DifficultyLevel)
                .Include(video => video.Problem)
                    .ThenInclude(problem => problem.ProgrammingDomain)
                .Where(video =>
                    !video.IsDeleted &&
                    !video.Problem.IsDeleted &&
                    video.Problem.IsPublished)
                .OrderBy(video => video.Problem.Title)
                .ThenByDescending(video => video.IsPrimary)
                .ThenBy(video => video.DisplayOrder)
                .ToListAsync(cancellationToken);
        }

        public async Task<ProblemVideo?> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            return await _dbContext.ProblemVideos
                .Include(video => video.Problem)
                .FirstOrDefaultAsync(
                    video =>
                        video.Id == id &&
                        !video.IsDeleted,
                    cancellationToken);
        }

        public async Task<IReadOnlyList<ProblemVideo>> GetByProblemSlugAsync(
            string problemSlug,
            CancellationToken cancellationToken)
        {
            problemSlug = problemSlug.Trim().ToLowerInvariant();

            return await _dbContext.ProblemVideos
                .AsNoTracking()
                .Include(video => video.Problem)
                .Where(video =>
                    !video.IsDeleted &&
                    !video.Problem.IsDeleted &&
                    video.Problem.IsPublished &&
                    video.Problem.Slug == problemSlug)
                .OrderByDescending(video => video.IsPrimary)
                .ThenBy(video => video.DisplayOrder)
                .ToListAsync(cancellationToken);
        }

        public async Task<ProblemVideo?> GetPrimaryByProblemSlugAsync(
            string problemSlug,
            CancellationToken cancellationToken)
        {
            problemSlug = problemSlug.Trim().ToLowerInvariant();

            return await _dbContext.ProblemVideos
                .AsNoTracking()
                .Include(video => video.Problem)
                .Where(video =>
                    !video.IsDeleted &&
                    !video.Problem.IsDeleted &&
                    video.Problem.IsPublished &&
                    video.Problem.Slug == problemSlug)
                .OrderByDescending(video => video.IsPrimary)
                .ThenBy(video => video.DisplayOrder)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task ClearPrimaryForProblemAsync(
            Guid problemId,
            Guid? exceptVideoId,
            CancellationToken cancellationToken)
        {
            var videos = await _dbContext.ProblemVideos
                .Where(video =>
                    video.ProblemId == problemId &&
                    !video.IsDeleted &&
                    video.IsPrimary &&
                    (!exceptVideoId.HasValue || video.Id != exceptVideoId.Value))
                .ToListAsync(cancellationToken);

            foreach (var video in videos)
            {
                video.IsPrimary = false;
                video.UpdatedAt = DateTime.UtcNow;
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task AddAsync(
            ProblemVideo video,
            CancellationToken cancellationToken)
        {
            await _dbContext.ProblemVideos.AddAsync(video, cancellationToken);

            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task UpdateAsync(
            ProblemVideo video,
            CancellationToken cancellationToken)
        {
            video.UpdatedAt = DateTime.UtcNow;

            _dbContext.ProblemVideos.Update(video);

            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task SoftDeleteAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            var video = await _dbContext.ProblemVideos
                .FirstOrDefaultAsync(
                    video => video.Id == id,
                    cancellationToken);

            if (video is null)
            {
                throw new KeyNotFoundException($"Video '{id}' was not found.");
            }

            video.IsDeleted = true;
            video.DeletedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}