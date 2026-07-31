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
    }
}