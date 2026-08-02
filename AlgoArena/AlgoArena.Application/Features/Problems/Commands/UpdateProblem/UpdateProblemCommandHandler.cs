using AlgoArena.Application.Features.Problems.Interfaces;
using AlgoArena.Domain.Entities.Problems;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.UpdateProblem
{
    /// <summary>
    /// Handles updating an existing programming problem.
    /// </summary>
    public sealed class UpdateProblemCommandHandler
        : IRequestHandler<UpdateProblemCommand, Guid>
    {
        private readonly IProblemRepository _problemRepository;

        public UpdateProblemCommandHandler(
            IProblemRepository problemRepository)
        {
            _problemRepository = problemRepository;
        }

        public async Task<Guid> Handle(
            UpdateProblemCommand request,
            CancellationToken cancellationToken)
        {
            var problem = await _problemRepository.GetByIdAsync(
                request.Id,
                cancellationToken);

            if (problem is null)
            {
                throw new KeyNotFoundException(
                    $"Problem '{request.Id}' was not found.");
            }

            problem.ProgrammingDomainId = request.ProgrammingDomainId;

            problem.DifficultyLevelId = request.DifficultyLevelId;

            problem.Title = request.Title
                                   .Trim();

            problem.Slug = request.Slug
                                  .Trim()
                                  .ToLowerInvariant();

            problem.Description = request.Description
                                         .Trim();

            problem.Constraints = request.Constraints
                                         .Trim();

            problem.TimeLimitInMilliseconds = request.TimeLimitInMilliseconds;

            problem.MemoryLimitInMegabytes = request.MemoryLimitInMegabytes;

            problem.UpdatedAt = DateTime.UtcNow;
            problem.ProblemTags.Clear();

            foreach (var tagId in request.TagIds.Distinct())
            {
                problem.ProblemTags.Add(new ProblemTag
                {
                    ProblemId = problem.Id,
                    TagId = tagId
                });
            }

            problem.ProblemExamples.Clear();

            foreach (var example in request.Examples)
            {
                problem.ProblemExamples.Add(new ProblemExample
                {
                    Id = Guid.NewGuid(),
                    ProblemId = problem.Id,
                    DisplayOrder = example.DisplayOrder,
                    Input = example.Input.Trim(),
                    Output = example.Output.Trim(),
                    Explanation = example.Explanation?.Trim()
                });
            }

            problem.ProblemTestCases.Clear();

            foreach (var testCase in request.TestCases)
            {
                problem.ProblemTestCases.Add(new ProblemTestCase
                {
                    Id = Guid.NewGuid(),
                    ProblemId = problem.Id,
                    DisplayOrder = testCase.DisplayOrder,
                    Input = testCase.Input.Trim(),
                    ExpectedOutput = testCase.ExpectedOutput.Trim(),
                    IsHidden = testCase.IsHidden
                });
            }

            problem.ProblemBoilerplates.Clear();

            foreach (var boilerplate in request.Boilerplates)
            {
                problem.ProblemBoilerplates.Add(new ProblemBoilerplate
                {
                    Id = Guid.NewGuid(),
                    ProblemId = problem.Id,
                    ProgrammingLanguageId = boilerplate.ProgrammingLanguageId,
                    TemplateCode = boilerplate.TemplateCode.Trim()
                });
            }

            await _problemRepository.UpdateAsync(
                problem,
                cancellationToken);

            return problem.Id;
        }
    }
}