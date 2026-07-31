using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Application.Features.Problems.Interfaces
{
    public interface IProblemArticleRepository
    {
        Task<IReadOnlyList<ProblemArticle>> GetAllAsync(
            CancellationToken cancellationToken);

        Task<ProblemArticle?> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken);

        Task<ProblemArticle?> GetPrimaryByProblemSlugAsync(
            string problemSlug,
            CancellationToken cancellationToken);

        Task ClearPrimaryForProblemAsync(
            Guid problemId,
            Guid? exceptArticleId,
            CancellationToken cancellationToken);
        Task AddAsync(
            ProblemArticle article,
            CancellationToken cancellationToken);

        Task UpdateAsync(
            ProblemArticle article,
            CancellationToken cancellationToken);

        Task SoftDeleteAsync(
            Guid id,
            CancellationToken cancellationToken);
    }
}