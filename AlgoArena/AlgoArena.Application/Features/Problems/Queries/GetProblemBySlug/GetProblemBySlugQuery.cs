using AlgoArena.Application.Features.Problems.DTOs;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetProblemBySlug
{
    public sealed record GetProblemBySlugQuery(string Slug)
        : IRequest<ProblemDetailDto?>;
}