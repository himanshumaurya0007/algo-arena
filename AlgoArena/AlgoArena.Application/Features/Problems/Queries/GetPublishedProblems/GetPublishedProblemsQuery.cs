using AlgoArena.Application.Features.Problems.DTOs;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetPublishedProblems
{
    public sealed record GetPublishedProblemsQuery
        : IRequest<IReadOnlyList<ProblemListItemDto>>;
}