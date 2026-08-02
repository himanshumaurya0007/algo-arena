using AlgoArena.Application.Features.Problems.DTOs.Videos;
using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetVideoById
{
    public sealed class GetVideoByIdQueryHandler
        : IRequestHandler<GetVideoByIdQuery, AdminVideoDto?>
    {
        private readonly IProblemVideoRepository _videoRepository;

        public GetVideoByIdQueryHandler(
            IProblemVideoRepository videoRepository)
        {
            _videoRepository = videoRepository;
        }

        public async Task<AdminVideoDto?> Handle(
            GetVideoByIdQuery request,
            CancellationToken cancellationToken)
        {
            var video = await _videoRepository.GetByIdAsync(
                request.Id,
                cancellationToken);

            if (video is null)
            {
                return null;
            }

            return new AdminVideoDto
            {
                Id = video.Id,
                ProblemId = video.ProblemId,
                ProblemTitle = video.Problem.Title,
                ProblemSlug = video.Problem.Slug,
                Title = video.Title,
                VideoUrl = video.VideoUrl,
                DisplayOrder = video.DisplayOrder,
                IsPrimary = video.IsPrimary
            };
        }
    }
}