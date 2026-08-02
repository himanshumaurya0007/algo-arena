namespace AlgoArena.Application.Features.CodeExecution.Models
{
    public sealed class JDoodleRequest
    {
        public string SourceCode { get; set; } = string.Empty;

        public string Language { get; set; } = string.Empty;

        public string VersionIndex { get; set; } = string.Empty;

        public string? Stdin { get; set; }

        public bool CompileOnly { get; set; }
    }
}