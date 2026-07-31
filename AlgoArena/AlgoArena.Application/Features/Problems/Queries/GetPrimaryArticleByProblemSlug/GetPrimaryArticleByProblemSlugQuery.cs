using AlgoArena.Application.Features.Problems.DTOs;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetPrimaryArticleByProblemSlug
{
    public sealed record GetPrimaryArticleByProblemSlugQuery(string ProblemSlug)
        : IRequest<ProblemArticleDto?>;
}