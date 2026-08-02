namespace AlgoArena.Application.Features.CodeExecution.Models
{
    public sealed class JDoodleResponse
    {
        public string? Output { get; set; }

        public string? Error { get; set; }

        public int? StatusCode { get; set; }

        public string? Memory { get; set; }

        public string? CpuTime { get; set; }

        public int? CompilationStatus { get; set; }

        public bool? IsExecutionSuccess { get; set; }

        public bool? IsCompiled { get; set; }
    }
}