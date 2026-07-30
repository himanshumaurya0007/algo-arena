using AlgoArena.Application.Features.Problems.DTOs;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetProblemById
{
    /// <summary>
    /// Query used to retrieve a programming problem by its unique identifier.
    /// </summary>
    public sealed record GetProblemByIdQuery(Guid Id)
        : IRequest<ProblemDto?>;
}