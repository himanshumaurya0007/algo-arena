using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.UpdateVideo
{
    public sealed class UpdateVideoCommandHandler
        : IRequestHandler<UpdateVideoCommand, bool>
    {
        private readonly IProblemVideoRepository _videoRepository;

        public UpdateVideoCommandHandler(
            IProblemVideoRepository videoRepository)
        {
            _videoRepository = videoRepository;
        }

        public async Task<bool> Handle(
            UpdateVideoCommand request,
            CancellationToken cancellationToken)
        {
            var video = await _videoRepository.GetByIdAsync(
                request.Id,
                cancellationToken);

            if (video is null)
            {
                return false;
            }

            if (request.IsPrimary)
            {
                await _videoRepository.ClearPrimaryForProblemAsync(
                    request.ProblemId,
                    request.Id,
                    cancellationToken);
            }

            video.ProblemId = request.ProblemId;
            video.Title = request.Title.Trim();
            video.VideoUrl = request.VideoUrl.Trim();
            video.DisplayOrder = request.DisplayOrder;
            video.IsPrimary = request.IsPrimary;

            await _videoRepository.UpdateAsync(
                video,
                cancellationToken);

            return true;
        }
    }
}