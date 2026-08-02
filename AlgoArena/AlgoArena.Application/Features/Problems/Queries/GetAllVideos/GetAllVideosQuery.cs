using AlgoArena.Application.Features.Problems.DTOs.Videos;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetAllVideos
{
    public sealed record GetAllVideosQuery()
        : IRequest<IReadOnlyList<AdminVideoDto>>;
}