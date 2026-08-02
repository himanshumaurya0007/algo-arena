using System.Net.Http.Json;
using AlgoArena.Application.Features.CodeExecution.Interfaces;
using AlgoArena.Application.Features.CodeExecution.Models;
using Microsoft.Extensions.Options;

namespace AlgoArena.Infrastructure.JDoodle
{
    /// <summary>
    /// HTTP client implementation for JDoodle Compiler API.
    /// </summary>
    public sealed class JDoodleService : IJDoodleService
    {
        private readonly HttpClient _httpClient;
        private readonly JDoodleOptions _options;

        public JDoodleService(
            HttpClient httpClient,
            IOptions<JDoodleOptions> options)
        {
            _httpClient = httpClient;
            _options = options.Value;
        }

        public async Task<JDoodleResponse> ExecuteAsync(
            JDoodleRequest request,
            CancellationToken cancellationToken = default)
        {
            var jdoodleRequest = new
            {
                clientId = _options.ClientId,
                clientSecret = _options.ClientSecret,
                script = request.SourceCode,
                language = request.Language,
                versionIndex = request.VersionIndex,
                stdin = request.Stdin,
                compileOnly = request.CompileOnly
            };

            using var response = await _httpClient.PostAsJsonAsync(
                "execute",
                jdoodleRequest,
                cancellationToken);

            var result = await response.Content
                .ReadFromJsonAsync<JDoodleApiResponse>(
                    cancellationToken);

            if (result is null)
            {
                throw new InvalidOperationException(
                    "JDoodle returned an empty response.");
            }

            return new JDoodleResponse
            {
                Output = result.Output,
                Error = result.Error,
                StatusCode = result.StatusCode,
                Memory = result.Memory,
                CpuTime = result.CpuTime,
                CompilationStatus = result.CompilationStatus,
                IsExecutionSuccess = response.IsSuccessStatusCode,
                IsCompiled = result.CompilationStatus == 0
            };
        }

        private sealed class JDoodleApiResponse
        {
            public string? Output { get; set; }

            public string? Error { get; set; }

            public int? StatusCode { get; set; }

            public string? Memory { get; set; }

            public string? CpuTime { get; set; }

            public int? CompilationStatus { get; set; }
        }
    }
}