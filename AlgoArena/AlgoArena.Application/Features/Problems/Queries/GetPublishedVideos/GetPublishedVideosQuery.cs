using AlgoArena.Application.Features.Problems.DTOs.Videos;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetPublishedVideos
{
    public sealed record GetPublishedVideosQuery()
        : IRequest<IReadOnlyList<ProblemVideoDto>>;
}