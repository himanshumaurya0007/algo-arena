namespace AlgoArena.Application.Features.CodeExecution.DTOs
{
    public sealed class RunCodeRequest
    {
        public Guid ProblemId { get; set; }

        public Guid ProgrammingLanguageId { get; set; }

        public string SourceCode { get; set; } = string.Empty;

        public string? CustomInput { get; set; }
    }
}