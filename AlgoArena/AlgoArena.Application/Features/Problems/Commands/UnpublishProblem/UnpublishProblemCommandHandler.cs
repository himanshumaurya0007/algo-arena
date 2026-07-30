using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.UnpublishProblem
{
    /// <summary>
    /// Handles unpublishing of an existing programming problem.
    /// </summary>
    public sealed class UnpublishProblemCommandHandler
        : IRequestHandler<UnpublishProblemCommand>
    {
        private readonly IProblemRepository _problemRepository;

        public UnpublishProblemCommandHandler(
            IProblemRepository problemRepository)
        {
            _problemRepository = problemRepository;
        }

        public async Task Handle(
            UnpublishProblemCommand request,
            CancellationToken cancellationToken)
        {
            var problem = await _problemRepository.GetByIdAsync(
                request.Id,
                cancellationToken);

            if (problem is null)
            {
                throw new KeyNotFoundException(
                    $"Problem '{request.Id}' was not found.");
            }

            if (problem.IsDeleted)
            {
                throw new InvalidOperationException(
                    "Deleted problems cannot be unpublished.");
            }

            if (!problem.IsPublished)
            {
                throw new InvalidOperationException(
                    "The problem is already unpublished.");
            }

            await _problemRepository.PublishAsync(
                request.Id,
                false,
                cancellationToken);
        }
    }
}