using AlgoArena.Application.Features.Problems.Interfaces;
using AlgoArena.Domain.Entities.Problems;
using AlgoArena.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace AlgoArena.Persistence.Repositories.Problems
{
    public sealed class ProblemArticleRepository : IProblemArticleRepository
    {
        private readonly AlgoArenaDbContext _dbContext;

        public ProblemArticleRepository(AlgoArenaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IReadOnlyList<ProblemArticle>> GetAllAsync(
            CancellationToken cancellationToken)
        {
            return await _dbContext.ProblemArticles
                .AsNoTracking()
                .Include(article => article.Problem)
                .Where(article => !article.IsDeleted)
                .OrderBy(article => article.Problem.Title)
                .ThenBy(article => article.Title)
                .ToListAsync(cancellationToken);
        }

        public async Task<ProblemArticle?> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            return await _dbContext.ProblemArticles
                .Include(article => article.Problem)
                .FirstOrDefaultAsync(
                    article =>
                        article.Id == id &&
                        !article.IsDeleted,
                    cancellationToken);
        }

        public async Task<ProblemArticle?> GetPrimaryByProblemSlugAsync(
            string problemSlug,
            CancellationToken cancellationToken)
        {
            problemSlug = problemSlug.Trim().ToLowerInvariant();

            return await _dbContext.ProblemArticles
                .AsNoTracking()
                .Include(article => article.Problem)
                .Where(article =>
                    article.IsPrimary &&
                    !article.IsDeleted &&
                    !article.Problem.IsDeleted &&
                    article.Problem.IsPublished &&
                    article.Problem.Slug == problemSlug)
                .FirstOrDefaultAsync(cancellationToken);
        }


        public async Task ClearPrimaryForProblemAsync(
            Guid problemId,
            Guid? exceptArticleId,
            CancellationToken cancellationToken)
        {
            var articles = await _dbContext.ProblemArticles
                .Where(article =>
                    article.ProblemId == problemId &&
                    article.IsPrimary &&
                    !article.IsDeleted &&
                    (!exceptArticleId.HasValue || article.Id != exceptArticleId.Value))
                .ToListAsync(cancellationToken);

            foreach (var article in articles)
            {
                article.IsPrimary = false;
                article.UpdatedAt = DateTime.UtcNow;
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task AddAsync(
            ProblemArticle article,
            CancellationToken cancellationToken)
        {
            await _dbContext.ProblemArticles.AddAsync(article, cancellationToken);

            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task UpdateAsync(
            ProblemArticle article,
            CancellationToken cancellationToken)
        {
            _dbContext.ProblemArticles.Update(article);

            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task SoftDeleteAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            var article = await _dbContext.ProblemArticles
                .FirstOrDefaultAsync(
                    article => article.Id == id,
                    cancellationToken);

            if (article is null)
            {
                throw new KeyNotFoundException($"Article '{id}' was not found.");
            }

            article.IsDeleted = true;
            article.DeletedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}