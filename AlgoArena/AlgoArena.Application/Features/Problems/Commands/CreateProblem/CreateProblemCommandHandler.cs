using AlgoArena.Application.Features.Problems.Interfaces;
using AlgoArena.Domain.Entities.Problems;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.CreateProblem
{
    /// <summary>
    /// Handles creation of a new programming problem.
    /// </summary>
    public sealed class CreateProblemCommandHandler
        : IRequestHandler<CreateProblemCommand, Guid>
    {
        private readonly IProblemRepository _problemRepository;

        public CreateProblemCommandHandler(
            IProblemRepository problemRepository)
        {
            _problemRepository = problemRepository;
        }

        public async Task<Guid> Handle(
            CreateProblemCommand request,
            CancellationToken cancellationToken)
        {
            var problemId = Guid.NewGuid();
            var problem = new Problem
            {
                Id = problemId,

                ProgrammingDomainId = request.ProgrammingDomainId,

                DifficultyLevelId = request.DifficultyLevelId,

                Title = request.Title
                               .Trim(),

                Slug = request.Slug
                              .Trim()
                              .ToLowerInvariant(),

                Description = request.Description
                                     .Trim(),

                Constraints = request.Constraints
                                     .Trim(),

                TimeLimitInMilliseconds = request.TimeLimitInMilliseconds,

                MemoryLimitInMegabytes = request.MemoryLimitInMegabytes,

                IsPublished = request.IsPublished,

                SolvedCount = 0,

                AttemptCount = 0,

            ProblemTags = request.TagIds
                .Distinct()
                .Select(tagId => new ProblemTag
                {
                    ProblemId = problemId,
                    TagId = tagId
                })
                .ToList(),

            ProblemExamples = request.Examples
                .Select(example => new ProblemExample
                {
                    Id = Guid.NewGuid(),
                    ProblemId = problemId,
                    DisplayOrder = example.DisplayOrder,
                    Input = example.Input.Trim(),
                    Output = example.Output.Trim(),
                    Explanation = example.Explanation?.Trim()
                })
                .ToList(),

            ProblemTestCases = request.TestCases
                .Select(testCase => new ProblemTestCase
                {
                     Id = Guid.NewGuid(),
                     ProblemId = problemId,
                     DisplayOrder = testCase.DisplayOrder,
                     Input = testCase.Input.Trim(),
                     ExpectedOutput = testCase.ExpectedOutput.Trim(),
                     IsHidden = testCase.IsHidden
                })
                .ToList(),

            ProblemBoilerplates = request.Boilerplates
                .Select(boilerplate => new ProblemBoilerplate
                {
                    Id = Guid.NewGuid(),
                    ProblemId = problemId,
                    ProgrammingLanguageId = boilerplate.ProgrammingLanguageId,
                    TemplateCode = boilerplate.TemplateCode.Trim()
                })
                .ToList()
            };

            await _problemRepository.AddAsync(
                problem,
                cancellationToken);

            return problem.Id;
        }
    }
}