namespace AlgoArena.Application.Features.Problems.DTOs
{
    public sealed class ProblemDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Slug { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Constraints { get; set; } = string.Empty;

        public Guid ProgrammingDomainId { get; set; }
        
        public string ProgrammingDomainName { get; set; } = string.Empty;

        public Guid DifficultyLevelId { get; set; }
        
        public string DifficultyLevelName { get; set; } = string.Empty;

        public bool IsPublished { get; set; }

        public int SolvedCount { get; set; }

        public int AttemptCount { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}