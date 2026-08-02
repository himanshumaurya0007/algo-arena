using AlgoArena.Application.Features.CodeExecution.Models;

namespace AlgoArena.Application.Features.CodeExecution.Interfaces
{
    public interface IJDoodleService
    {
        Task<JDoodleResponse> ExecuteAsync(
            JDoodleRequest request,
            CancellationToken cancellationToken = default);
    }
}