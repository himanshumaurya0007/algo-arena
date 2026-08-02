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

        public IReadOnlyList<Guid> TagIds { get; set; } =
    [];

        public IReadOnlyList<ProblemExampleDto> Examples { get; set; } =
            [];

        public IReadOnlyList<ProblemTestCaseDto> TestCases { get; set; } =
            [];

        public IReadOnlyList<ProblemBoilerplateEditDto> Boilerplates { get; set; } =
            [];
    }

    public sealed class ProblemTestCaseDto
    {
        public short DisplayOrder { get; set; }

        public string Input { get; set; } = string.Empty;

        public string ExpectedOutput { get; set; } = string.Empty;

        public bool IsHidden { get; set; }
    }

    public sealed class ProblemBoilerplateEditDto
    {
        public Guid ProgrammingLanguageId { get; set; }

        public string ProgrammingLanguageName { get; set; } = string.Empty;

        public string TemplateCode { get; set; } = string.Empty;
    }
}