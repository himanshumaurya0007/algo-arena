namespace AlgoArena.Application.Features.CodeExecution.DTOs
{
    public sealed class RunCodeResponse
    {
        public bool IsSuccess { get; set; }

        public bool IsAccepted { get; set; }

        public string Status { get; set; } = string.Empty;

        public string? StandardOutput { get; set; }

        public string? StandardError { get; set; }

        public string? CompilationOutput { get; set; }

        public decimal? ExecutionTimeInMilliseconds { get; set; }

        public int? MemoryUsedInKilobytes { get; set; }

        public string? ErrorMessage { get; set; }
    }
}