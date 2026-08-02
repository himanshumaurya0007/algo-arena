using AlgoArena.Application.Features.Problems.DTOs.Videos;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetVideosByProblemSlug
{
    public sealed record GetVideosByProblemSlugQuery(string ProblemSlug)
        : IRequest<IReadOnlyList<ProblemVideoDto>>;
}