namespace AlgoArena.Application.Features.Problems.DTOs
{
    public sealed class ProblemExampleRequest
    {
        public byte DisplayOrder { get; init; }

        public string Input { get; init; } = string.Empty;

        public string Output { get; init; } = string.Empty;

        public string? Explanation { get; init; }
    }

    public sealed class ProblemTestCaseRequest
    {
        public short DisplayOrder { get; init; }

        public string Input { get; init; } = string.Empty;

        public string ExpectedOutput { get; init; } = string.Empty;

        public bool IsHidden { get; init; }
    }

    public sealed class ProblemBoilerplateRequest
    {
        public Guid ProgrammingLanguageId { get; init; }

        public string TemplateCode { get; init; } = string.Empty;
    }
}