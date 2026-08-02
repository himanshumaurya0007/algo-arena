using AlgoArena.Application.Features.CodeExecution.DTOs;
using AlgoArena.Application.Features.CodeExecution.Interfaces;
using AlgoArena.Application.Features.CodeExecution.Models;
using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.CodeExecution.Commands.RunCode
{
    public sealed class RunCodeCommandHandler
        : IRequestHandler<RunCodeCommand, RunCodeResponse>
    {
        private readonly IJDoodleService _jdoodleService;
        private readonly IProblemRepository _problemRepository;

        public RunCodeCommandHandler(
            IJDoodleService jdoodleService,
            IProblemRepository problemRepository)
        {
            _jdoodleService = jdoodleService;
            _problemRepository = problemRepository;
        }

        public async Task<RunCodeResponse> Handle(
            RunCodeCommand request,
            CancellationToken cancellationToken)
        {
            // 1. Get the problem
            var problem = await _problemRepository.GetByIdAsync(
                request.Request.ProblemId,
                cancellationToken);

            if (problem is null)
            {
                return new RunCodeResponse
                {
                    IsSuccess = false,
                    IsAccepted = false,
                    Status = "Problem Not Found",
                    ErrorMessage = "The requested problem does not exist."
                };
            }

            // 2. Find the selected programming language
            var boilerplate = problem.ProblemBoilerplates
                .FirstOrDefault(x =>
                    x.ProgrammingLanguageId ==
                    request.Request.ProgrammingLanguageId);

            if (boilerplate is null)
            {
                return new RunCodeResponse
                {
                    IsSuccess = false,
                    IsAccepted = false,
                    Status = "Unsupported Language",
                    ErrorMessage =
                        "The selected programming language is not supported for this problem."
                };
            }

            // 3. Get JDoodle language configuration
            var languageConfiguration =
                GetJDoodleLanguageConfiguration(
                    boilerplate.ProgrammingLanguage.Name);

            if (languageConfiguration is null)
            {
                return new RunCodeResponse
                {
                    IsSuccess = false,
                    IsAccepted = false,
                    Status = "Unsupported Language",
                    ErrorMessage =
                        $"JDoodle execution is currently supported only for C, C++ and Java."
                };
            }

            // 4. Prepare JDoodle request
            var jdoodleRequest = new JDoodleRequest
            {
                SourceCode = request.Request.SourceCode,
                Language = languageConfiguration.Value.Language,
                VersionIndex = languageConfiguration.Value.VersionIndex,
                Stdin = request.Request.CustomInput,
                CompileOnly = false
            };

            // 5. Execute code through JDoodle
            JDoodleResponse result;

            try
            {
                result = await _jdoodleService.ExecuteAsync(
                    jdoodleRequest,
                    cancellationToken);
            }
            catch (HttpRequestException ex)
            {
                return new RunCodeResponse
                {
                    IsSuccess = false,
                    IsAccepted = false,
                    Status = "JDoodle Error",
                    ErrorMessage =
                        $"Unable to communicate with JDoodle: {ex.Message}"
                };
            }
            catch (TaskCanceledException)
            {
                return new RunCodeResponse
                {
                    IsSuccess = false,
                    IsAccepted = false,
                    Status = "Execution Timeout",
                    ErrorMessage =
                        "The request to JDoodle timed out."
                };
            }

            // 6. Determine execution status
            var hasError =
                !string.IsNullOrWhiteSpace(result.Error);

            var isAccepted =
                !hasError &&
                result.StatusCode == 200;

            // 7. Convert JDoodle response into AlgoArena response
            return new RunCodeResponse
            {
                IsSuccess = true,
                IsAccepted = isAccepted,

                Status = hasError
                    ? "Runtime / Compilation Error"
                    : "Accepted",

                StandardOutput = result.Output,

                StandardError = result.Error,

                CompilationOutput = result.Error,

                ExecutionTimeInMilliseconds =
                    ParseCpuTimeToMilliseconds(result.CpuTime),

                MemoryUsedInKilobytes =
                    ParseMemoryToKilobytes(result.Memory),

                ErrorMessage = hasError
                    ? result.Error
                    : null
            };
        }

        private static (string Language, string VersionIndex)?
            GetJDoodleLanguageConfiguration(
                string languageName)
        {
            return languageName.Trim().ToLowerInvariant() switch
            {
                "c" => ("c", "5"),

                "c++" => ("cpp", "5"),

                "java" => ("java", "5"),

                _ => null
            };
        }

        private static decimal? ParseCpuTimeToMilliseconds(
            string? cpuTime)
        {
            if (string.IsNullOrWhiteSpace(cpuTime))
            {
                return null;
            }

            if (decimal.TryParse(
                cpuTime,
                out var seconds))
            {
                return seconds * 1000;
            }

            return null;
        }

        private static int? ParseMemoryToKilobytes(
            string? memory)
        {
            if (string.IsNullOrWhiteSpace(memory))
            {
                return null;
            }

            if (int.TryParse(memory, out var value))
            {
                return value;
            }

            return null;
        }
    }
}