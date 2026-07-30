using System.ComponentModel.DataAnnotations;

namespace AlgoArena.Application.Features.Problems.DTOs
{
    public sealed class UpdateProblemRequest
    {
        public Guid Id { get; set; }

        public Guid ProgrammingDomainId { get; set; }

        public Guid DifficultyLevelId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Slug { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Constraints { get; set; } = string.Empty;

        public int TimeLimitInMilliseconds { get; set; }

        public int MemoryLimitInMegabytes { get; set; }

        public bool IsPublished { get; set; }
    }
}