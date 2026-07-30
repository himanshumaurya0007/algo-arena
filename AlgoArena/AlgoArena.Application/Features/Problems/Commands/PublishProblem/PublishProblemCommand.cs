using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.PublishProblem
{
    /// <summary>
    /// Command used to publish a programming problem.
    /// </summary>
    public sealed record PublishProblemCommand(Guid Id) : IRequest;
}