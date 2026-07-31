namespace AlgoArena.Application.Features.CodeExecution.Models
{
    public sealed class Judge0Request
    {
        public string SourceCode { get; set; } = string.Empty;

        public int LanguageId { get; set; }

        public string? Stdin { get; set; }

        public string? ExpectedOutput { get; set; }

        public double? CpuTimeLimit { get; set; }

        public int? MemoryLimit { get; set; }
    }
}