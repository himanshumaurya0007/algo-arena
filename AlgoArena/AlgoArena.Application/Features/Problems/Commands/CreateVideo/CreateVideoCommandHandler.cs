using AlgoArena.Application.Features.Problems.Interfaces;
using AlgoArena.Domain.Entities.Problems;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.CreateVideo
{
    public sealed class CreateVideoCommandHandler
        : IRequestHandler<CreateVideoCommand, Guid>
    {
        private readonly IProblemVideoRepository _videoRepository;

        public CreateVideoCommandHandler(
            IProblemVideoRepository videoRepository)
        {
            _videoRepository = videoRepository;
        }

        public async Task<Guid> Handle(
            CreateVideoCommand request,
            CancellationToken cancellationToken)
        {
            if (request.IsPrimary)
            {
                await _videoRepository.ClearPrimaryForProblemAsync(
                    request.ProblemId,
                    exceptVideoId: null,
                    cancellationToken);
            }

            var video = new ProblemVideo
            {
                Id = Guid.NewGuid(),
                ProblemId = request.ProblemId,
                Title = request.Title.Trim(),
                VideoUrl = request.VideoUrl.Trim(),
                DisplayOrder = request.DisplayOrder,
                IsPrimary = request.IsPrimary
            };

            await _videoRepository.AddAsync(
                video,
                cancellationToken);

            return video.Id;
        }
    }
}