using AlgoArena.Application.Features.Problems.DTOs;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetAllProblems
{
    /// <summary>
    /// Query used to retrieve all programming problems.
    /// </summary>
    public sealed record GetAllProblemsQuery
        : IRequest<IReadOnlyList<ProblemDto>>;
}