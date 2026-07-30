using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Application.Features.Problems.Interfaces
{
    /// <summary>
    /// Defines repository operations for managing programming problems.
    /// </summary>
    public interface IProblemRepository
    {
        Task<IReadOnlyList<Problem>> GetAllAsync(
            CancellationToken cancellationToken);

        Task<Problem?> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken);

        Task<bool> ExistsAsync(
            string slug,
            CancellationToken cancellationToken);

        Task AddAsync(
            Problem problem,
            CancellationToken cancellationToken);

        Task UpdateAsync(
            Problem problem,
            CancellationToken cancellationToken);

        Task SoftDeleteAsync(
            Guid id,
            CancellationToken cancellationToken);

        Task PublishAsync(
            Guid id,
            bool isPublished,
            CancellationToken cancellationToken);
    }
}