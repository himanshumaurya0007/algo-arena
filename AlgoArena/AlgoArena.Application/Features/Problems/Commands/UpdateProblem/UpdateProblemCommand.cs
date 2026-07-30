using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.UpdateProblem
{
    /// <summary>
    /// Command used to update an existing programming problem.
    /// </summary>
    public sealed record UpdateProblemCommand : IRequest<Guid>
    {
        public Guid Id { get; init; }

        public Guid ProgrammingDomainId { get; init; }

        public Guid DifficultyLevelId { get; init; }

        public string Title { get; init; } = string.Empty;

        public string Slug { get; init; } = string.Empty;

        public string Description { get; init; } = string.Empty;

        public string Constraints { get; init; } = string.Empty;

        public int TimeLimitInMilliseconds { get; init; }

        public int MemoryLimitInMegabytes { get; init; }
    }
}