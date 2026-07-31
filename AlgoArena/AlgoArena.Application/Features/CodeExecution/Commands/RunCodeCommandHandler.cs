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
        private readonly IJudge0Service _judge0Service;
        private readonly IProblemRepository _problemRepository;

        public RunCodeCommandHandler(
            IJudge0Service judge0Service,
            IProblemRepository problemRepository)
        {
            _judge0Service = judge0Service;
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

            // 3. Get Judge0 language ID
            var languageId = GetJudge0LanguageId(
                boilerplate.ProgrammingLanguage.Name);

            if (languageId is null)
            {
                return new RunCodeResponse
                {
                    IsSuccess = false,
                    IsAccepted = false,
                    Status = "Unsupported Language",
                    ErrorMessage =
                        $"Judge0 language mapping is not configured for '{boilerplate.ProgrammingLanguage.Name}'."
                };
            }

            // 4. Prepare Judge0 request
            var judgeRequest = new Judge0Request
            {
                SourceCode = request.Request.SourceCode,
                LanguageId = languageId.Value,
                Stdin = request.Request.CustomInput,
                CpuTimeLimit =
                    problem.TimeLimitInMilliseconds / 1000.0,
                MemoryLimit =
                    problem.MemoryLimitInMegabytes * 1024
            };

            // 5. Execute code through Judge0
            var result = await _judge0Service.ExecuteAsync(
                judgeRequest,
                cancellationToken);

            // 6. Determine result
            var isAccepted =
                result.StatusId == 3;

            return new RunCodeResponse
            {
                IsSuccess = true,
                IsAccepted = isAccepted,
                Status = result.StatusDescription ?? "Unknown",
                StandardOutput = result.StandardOutput,
                StandardError = result.StandardError,
                CompilationOutput = result.CompilationOutput,
                ExecutionTimeInMilliseconds =
                    result.ExecutionTimeInSeconds.HasValue
                        ? result.ExecutionTimeInSeconds.Value * 1000
                        : null,
                MemoryUsedInKilobytes =
                    result.MemoryInKilobytes,
                ErrorMessage = result.Message
            };
        }

        private static int? GetJudge0LanguageId(
            string languageName)
        {
            return languageName.Trim().ToLowerInvariant() switch
            {
                "c" => 50,
                "c++" => 54,
                "java" => 62,
                "python" => 71,
                "c#" => 51,
                "javascript" => 63,
                _ => null
            };
        }
    }
}