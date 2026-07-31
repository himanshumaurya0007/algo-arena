using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Application.Features.Problems.Interfaces
{
    public interface IProblemArticleRepository
    {
        Task<ProblemArticle?> GetPrimaryByProblemSlugAsync(
            string problemSlug,
            CancellationToken cancellationToken);
    }
}