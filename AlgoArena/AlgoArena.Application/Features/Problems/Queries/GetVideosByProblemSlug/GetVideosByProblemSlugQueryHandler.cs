using AlgoArena.Application.Features.Problems.DTOs.Videos;
using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetVideosByProblemSlug
{
    public sealed class GetVideosByProblemSlugQueryHandler
        : IRequestHandler<GetVideosByProblemSlugQuery, IReadOnlyList<ProblemVideoDto>>
    {
        private readonly IProblemVideoRepository _videoRepository;

        public GetVideosByProblemSlugQueryHandler(
            IProblemVideoRepository videoRepository)
        {
            _videoRepository = videoRepository;
        }

        public async Task<IReadOnlyList<ProblemVideoDto>> Handle(
            GetVideosByProblemSlugQuery request,
            CancellationToken cancellationToken)
        {
            var videos = await _videoRepository.GetByProblemSlugAsync(
                request.ProblemSlug,
                cancellationToken);

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