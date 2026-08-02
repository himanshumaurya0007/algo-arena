using MediatR;
using AlgoArena.Application.Features.Problems.DTOs;

namespace AlgoArena.Application.Features.Problems.Commands.CreateProblem
{
    /// <summary>
    /// Command used to create a new programming problem.
    /// </summary>
    public sealed record CreateProblemCommand : IRequest<Guid>
    {
        public Guid ProgrammingDomainId { get; init; }

        public Guid DifficultyLevelId { get; init; }

        public string Title { get; init; } = string.Empty;

        public string Slug { get; init; } = string.Empty;

        public string Description { get; init; } = string.Empty;

        public string Constraints { get; init; } = string.Empty;

        public int TimeLimitInMilliseconds { get; init; }

        public int MemoryLimitInMegabytes { get; init; }

        public bool IsPublished { get; init; }

        public IReadOnlyList<Guid> TagIds { get; init; } =
    [];

        public IReadOnlyList<ProblemExampleRequest> Examples { get; init; } =
            [];

        public IReadOnlyList<ProblemTestCaseRequest> TestCases { get; init; } =
            [];

        public IReadOnlyList<ProblemBoilerplateRequest> Boilerplates { get; init; } =
            [];
    }
}