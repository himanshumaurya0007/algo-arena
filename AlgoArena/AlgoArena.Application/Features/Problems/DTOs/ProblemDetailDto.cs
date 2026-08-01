namespace AlgoArena.Application.Features.Problems.DTOs
{
    public sealed class ProblemDetailDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Slug { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Constraints { get; set; } = string.Empty;

        public int TimeLimitInMilliseconds { get; set; }

        public int MemoryLimitInMegabytes { get; set; }

        public string DifficultyLevelName { get; set; } = string.Empty;

        public string ProgrammingDomainName { get; set; } = string.Empty;

        public IReadOnlyList<string> Tags { get; set; } = [];

        public IReadOnlyList<ProblemExampleDto> Examples { get; set; } = [];

        public IReadOnlyList<ProblemPublicTestCaseDto> TestCases { get; set; } = [];

        public IReadOnlyList<ProblemBoilerplateDto> Boilerplates { get; set; } = [];

        public IReadOnlyList<ProblemArticleSummaryDto> Articles { get; set; } = [];

        public IReadOnlyList<ProblemVideoSummaryDto> Videos { get; set; } = [];
    }

    public sealed class ProblemExampleDto
    {
        public byte DisplayOrder { get; set; }

        public string Input { get; set; } = string.Empty;

        public string Output { get; set; } = string.Empty;

        public string? Explanation { get; set; }
    }

    public sealed class ProblemPublicTestCaseDto
    {
        public short DisplayOrder { get; set; }

        public string Input { get; set; } = string.Empty;

        public string ExpectedOutput { get; set; } = string.Empty;

        public bool IsHidden { get; set; }
    }
    public sealed class ProblemBoilerplateDto
    {
        public string ProgrammingLanguageName { get; set; } = string.Empty;

        public string TemplateCode { get; set; } = string.Empty;
    }

    public sealed class ProblemArticleSummaryDto
    {
        public string Title { get; set; } = string.Empty;

        public bool IsPrimary { get; set; }
    }

    public sealed class ProblemVideoSummaryDto
    {
        public string Title { get; set; } = string.Empty;

        public string VideoUrl { get; set; } = string.Empty;

        public bool IsPrimary { get; set; }
    }
}