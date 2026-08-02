using AlgoArena.Application.Features.Lookups.DTOs;

namespace AlgoArena.Application.Features.Lookups.Interfaces
{
    public interface ILookupRepository
    {
        Task<IReadOnlyList<LookupDto>> GetDifficultyLevelsAsync(
            CancellationToken cancellationToken);

        Task<IReadOnlyList<LookupDto>> GetProgrammingDomainsAsync(
            CancellationToken cancellationToken);

        Task<IReadOnlyList<LookupDto>> GetProgrammingLanguagesAsync(
            CancellationToken cancellationToken);

        Task<IReadOnlyList<LookupDto>> GetTagsAsync(
            CancellationToken cancellationToken);
    }
}