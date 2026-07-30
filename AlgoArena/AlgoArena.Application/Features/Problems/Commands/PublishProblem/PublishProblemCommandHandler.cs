using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.PublishProblem
{
    /// <summary>
    /// Handles publishing of an existing programming problem.
    /// </summary>
    public sealed class PublishProblemCommandHandler
        : IRequestHandler<PublishProblemCommand>
    {
        private readonly IProblemRepository _problemRepository;

        public PublishProblemCommandHandler(
            IProblemRepository problemRepository)
        {
            _problemRepository = problemRepository;
        }

        public async Task Handle(
            PublishProblemCommand request,
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
                    "Deleted problems cannot be published.");
            }

            if (problem.IsPublished)
            {
                throw new InvalidOperationException(
                    "The problem is already published.");
            }

            await _problemRepository.PublishAsync(
                request.Id,
                true,
                cancellationToken);
        }
    }
}