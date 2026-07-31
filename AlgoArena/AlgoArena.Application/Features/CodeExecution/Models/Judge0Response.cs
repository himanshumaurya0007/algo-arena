namespace AlgoArena.Application.Features.CodeExecution.Models
{
    public sealed class Judge0Response
    {
        public string? Token { get; set; }

        public int? StatusId { get; set; }

        public string? StatusDescription { get; set; }

        public string? StandardOutput { get; set; }

        public string? StandardError { get; set; }

        public string? CompilationOutput { get; set; }

        public string? Message { get; set; }

        public decimal? ExecutionTimeInSeconds { get; set; }

        public int? MemoryInKilobytes { get; set; }
    }
}