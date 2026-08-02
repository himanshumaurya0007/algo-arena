using AlgoArena.Application.Features.Problems.DTOs.Videos;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetVideoById
{
    public sealed record GetVideoByIdQuery(Guid Id)
        : IRequest<AdminVideoDto?>;
}