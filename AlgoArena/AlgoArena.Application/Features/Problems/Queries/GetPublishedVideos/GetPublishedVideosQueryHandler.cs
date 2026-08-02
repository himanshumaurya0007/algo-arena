using AlgoArena.Application.Features.Problems.DTOs.Videos;
using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetPublishedVideos
{
    public sealed class GetPublishedVideosQueryHandler
        : IRequestHandler<GetPublishedVideosQuery, IReadOnlyList<ProblemVideoDto>>
    {
        private readonly IProblemVideoRepository _videoRepository;

        public GetPublishedVideosQueryHandler(
            IProblemVideoRepository videoRepository)
        {
            _videoRepository = videoRepository;
        }

        public async Task<IReadOnlyList<ProblemVideoDto>> Handle(
            GetPublishedVideosQuery request,
            CancellationToken cancellationToken)
        {
            var videos = await _videoRepository.GetPublishedAsync(cancellationToken);

            return videos
                .Select(video => new ProblemVideoDto
                {
                    Id = video.Id,
                    ProblemTitle = video.Problem.Title,
                    ProblemSlug = video.Problem.Slug,
                    Title = video.Title,
                    VideoUrl = video.VideoUrl,
                    DisplayOrder = video.DisplayOrder,
                    IsPrimary = video.IsPrimary
                })
                .ToList();
        }
    }
}