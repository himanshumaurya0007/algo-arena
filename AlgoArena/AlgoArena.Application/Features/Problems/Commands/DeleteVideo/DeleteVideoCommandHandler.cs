using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.DeleteVideo
{
    public sealed class DeleteVideoCommandHandler
        : IRequestHandler<DeleteVideoCommand, bool>
    {
        private readonly IProblemVideoRepository _videoRepository;

        public DeleteVideoCommandHandler(
            IProblemVideoRepository videoRepository)
        {
            _videoRepository = videoRepository;
        }

        public async Task<bool> Handle(
            DeleteVideoCommand request,
            CancellationToken cancellationToken)
        {
            var video = await _videoRepository.GetByIdAsync(
                request.Id,
                cancellationToken);

            if (video is null)
            {
                return false;
            }

            await _videoRepository.SoftDeleteAsync(
                request.Id,
                cancellationToken);

            return true;
        }
    }
}