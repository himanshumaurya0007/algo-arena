namespace AlgoArena.Application.Features.Problems.DTOs
{
    public sealed class ProblemListItemDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Slug { get; set; } = string.Empty;

        public string DifficultyLevelName { get; set; } = string.Empty;

        public string ProgrammingDomainName { get; set; } = string.Empty;

        public bool IsPublished { get; set; }

        public int SolvedCount { get; set; }

        public int AttemptCount { get; set; }
    }
}
