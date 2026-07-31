using AlgoArena.Application.Features.CodeExecution.Models;

namespace AlgoArena.Application.Features.CodeExecution.Interfaces
{
    public interface IJudge0Service
    {
        Task<Judge0Response> ExecuteAsync(
            Judge0Request request,
            CancellationToken cancellationToken = default);
    }
}