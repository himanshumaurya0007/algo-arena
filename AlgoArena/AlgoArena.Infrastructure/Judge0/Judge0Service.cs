// using System.Net.Http.Json;
using AlgoArena.Application.Features.CodeExecution.Interfaces;
using AlgoArena.Application.Features.CodeExecution.Models;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;

namespace AlgoArena.Infrastructure.Judge0
{
    /// <summary>
    /// HTTP client implementation for Judge0.
    /// </summary>
    public sealed class Judge0Service : IJudge0Service
    {
        private readonly HttpClient _httpClient;
        private readonly Judge0Options _options;

        public Judge0Service(
            HttpClient httpClient,
            IOptions<Judge0Options> options)
        {
            _httpClient = httpClient;
            _options = options.Value;
        }

        public async Task<Judge0Response> ExecuteAsync(
            Judge0Request request,
            CancellationToken cancellationToken = default)
        {
            var judgeRequest = new
            {
                language_id = request.LanguageId,
                source_code = request.SourceCode,
                stdin = request.Stdin,
                expected_output = request.ExpectedOutput
            };

            using var response = await _httpClient.PostAsJsonAsync(
                "submissions?base64_encoded=false&wait=true",
                judgeRequest,
                cancellationToken);

            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<Judge0ApiResponse>(
                cancellationToken);

            if (result is null)
            {
                throw new InvalidOperationException(
                    "Judge0 returned an empty response.");
            }

            return new Judge0Response
            {
                Token = result.Token,
                StatusId = result.Status?.Id,
                StatusDescription = result.Status?.Description,
                StandardOutput = result.Stdout,
                StandardError = result.Stderr,
                CompilationOutput = result.CompileOutput,
                Message = result.Message,
                ExecutionTimeInSeconds = result.Time,
                MemoryInKilobytes = result.Memory
            };
        }

        private sealed class Judge0ApiResponse
        {
            public string? Token { get; set; }

            public Judge0Status? Status { get; set; }

            public string? Stdout { get; set; }

            public string? Stderr { get; set; }

            public string? CompileOutput { get; set; }

            public string? Message { get; set; }

            public decimal? Time { get; set; }

            public int? Memory { get; set; }
        }

        private sealed class Judge0Status
        {
            public int Id { get; set; }

            public string? Description { get; set; }
        }
    }
}