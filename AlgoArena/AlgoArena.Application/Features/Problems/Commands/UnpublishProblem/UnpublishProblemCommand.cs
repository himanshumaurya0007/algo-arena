using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.UnpublishProblem
{
    /// <summary>
    /// Command used to unpublish a programming problem.
    /// </summary>
    public sealed record UnpublishProblemCommand(Guid Id) : IRequest;
}