using AlgoArena.Application.Features.Problems.Interfaces;
using AlgoArena.Domain.Entities.Problems;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.CreateProblem
{
    /// <summary>
    /// Handles creation of a new programming problem.
    /// </summary>
    public sealed class CreateProblemCommandHandler
        : IRequestHandler<CreateProblemCommand, Guid>
    {
        private readonly IProblemRepository _problemRepository;

        public CreateProblemCommandHandler(
            IProblemRepository problemRepository)
        {
            _problemRepository = problemRepository;
        }

        public async Task<Guid> Handle(
            CreateProblemCommand request,
            CancellationToken cancellationToken)
        {
            var problem = new Problem
            {
                Id = Guid.NewGuid(),

                ProgrammingDomainId = request.ProgrammingDomainId,

                DifficultyLevelId = request.DifficultyLevelId,

                Title = request.Title
                               .Trim(),

                Slug = request.Slug
                              .Trim()
                              .ToLowerInvariant(),

                Description = request.Description
                                     .Trim(),

                Constraints = request.Constraints
                                     .Trim(),

                TimeLimitInMilliseconds = request.TimeLimitInMilliseconds,

                MemoryLimitInMegabytes = request.MemoryLimitInMegabytes,

                IsPublished = request.IsPublished,

                SolvedCount = 0,

                AttemptCount = 0
            };

            await _problemRepository.AddAsync(
                problem,
                cancellationToken);

            return problem.Id;
        }
    }
}