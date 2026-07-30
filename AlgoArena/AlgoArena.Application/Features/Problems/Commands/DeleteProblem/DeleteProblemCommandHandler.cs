using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.DeleteProblem
{
    /// <summary>
    /// Handles soft deletion of an existing programming problem.
    /// </summary>
    public sealed class DeleteProblemCommandHandler
        : IRequestHandler<DeleteProblemCommand>
    {
        private readonly IProblemRepository _problemRepository;

        public DeleteProblemCommandHandler(
            IProblemRepository problemRepository)
        {
            _problemRepository = problemRepository;
        }

        public async Task Handle(
            DeleteProblemCommand request,
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
                    "The problem has already been deleted.");
            }

            await _problemRepository.SoftDeleteAsync(
                request.Id,
                cancellationToken);
        }
    }
}