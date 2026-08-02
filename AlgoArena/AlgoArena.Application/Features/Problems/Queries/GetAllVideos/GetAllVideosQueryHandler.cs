using AlgoArena.Application.Features.Problems.DTOs.Videos;
using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetAllVideos
{
    public sealed class GetAllVideosQueryHandler
        : IRequestHandler<GetAllVideosQuery, IReadOnlyList<AdminVideoDto>>
    {
        private readonly IProblemVideoRepository _videoRepository;

        public GetAllVideosQueryHandler(
            IProblemVideoRepository videoRepository)
        {
            _videoRepository = videoRepository;
        }

        public async Task<IReadOnlyList<AdminVideoDto>> Handle(
            GetAllVideosQuery request,
            CancellationToken cancellationToken)
        {
            var videos = await _videoRepository.GetAllAsync(cancellationToken);

            return videos
                .Select(video => new AdminVideoDto
                {
                    Id = video.Id,
                    ProblemId = video.ProblemId,
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