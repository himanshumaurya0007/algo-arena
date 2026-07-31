using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.UpdateProblem
{
    /// <summary>
    /// Handles updating an existing programming problem.
    /// </summary>
    public sealed class UpdateProblemCommandHandler
        : IRequestHandler<UpdateProblemCommand, Guid>
    {
        private readonly IProblemRepository _problemRepository;

        public UpdateProblemCommandHandler(
            IProblemRepository problemRepository)
        {
            _problemRepository = problemRepository;
        }

        public async Task<Guid> Handle(
            UpdateProblemCommand request,
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

            problem.ProgrammingDomainId = request.ProgrammingDomainId;

            problem.DifficultyLevelId = request.DifficultyLevelId;

            problem.Title = request.Title
                                   .Trim();

            problem.Slug = request.Slug
                                  .Trim()
                                  .ToLowerInvariant();

            problem.Description = request.Description
                                         .Trim();

            problem.Constraints = request.Constraints
                                         .Trim();

            problem.TimeLimitInMilliseconds = request.TimeLimitInMilliseconds;

            problem.MemoryLimitInMegabytes = request.MemoryLimitInMegabytes;

            problem.UpdatedAt = DateTime.UtcNow;

            await _problemRepository.UpdateAsync(
                problem,
                cancellationToken);

            return problem.Id;
        }
    }
}