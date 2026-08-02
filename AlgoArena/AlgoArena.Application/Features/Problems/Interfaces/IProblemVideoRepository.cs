using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Application.Features.Problems.Interfaces
{
    public interface IProblemVideoRepository
    {
        Task<IReadOnlyList<ProblemVideo>> GetAllAsync(
            CancellationToken cancellationToken);

        Task<IReadOnlyList<ProblemVideo>> GetPublishedAsync(
            CancellationToken cancellationToken);

        Task<ProblemVideo?> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken);

        Task<IReadOnlyList<ProblemVideo>> GetByProblemSlugAsync(
            string problemSlug,
            CancellationToken cancellationToken);

        Task<ProblemVideo?> GetPrimaryByProblemSlugAsync(
            string problemSlug,
            CancellationToken cancellationToken);

        Task ClearPrimaryForProblemAsync(
            Guid problemId,
            Guid? exceptVideoId,
            CancellationToken cancellationToken);

        Task AddAsync(
            ProblemVideo video,
            CancellationToken cancellationToken);

        Task UpdateAsync(
            ProblemVideo video,
            CancellationToken cancellationToken);

        Task SoftDeleteAsync(
            Guid id,
            CancellationToken cancellationToken);
    }
}