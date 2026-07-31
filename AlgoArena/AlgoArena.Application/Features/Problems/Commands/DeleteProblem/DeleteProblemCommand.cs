using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.DeleteProblem
{
    /// <summary>
    /// Command used to soft delete an existing programming problem.
    /// </summary>
    public sealed record DeleteProblemCommand(Guid Id) : IRequest;
}