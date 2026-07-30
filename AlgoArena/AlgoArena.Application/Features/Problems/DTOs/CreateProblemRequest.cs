using System.ComponentModel.DataAnnotations;

namespace AlgoArena.Application.Features.Problems.DTOs
{
    public sealed class CreateProblemRequest
    {
        public Guid ProgrammingDomainId { get; set; }

        public Guid DifficultyLevelId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Slug { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Constraints { get; set; } = string.Empty;

        public int TimeLimitInMilliseconds { get; set; } = 1000;

        public int MemoryLimitInMegabytes { get; set; } = 256;

        public bool IsPublished { get; set; }
    }
}