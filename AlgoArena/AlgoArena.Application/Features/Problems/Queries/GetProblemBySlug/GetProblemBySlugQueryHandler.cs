using AlgoArena.Application.Features.Problems.DTOs;
using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetProblemBySlug
{
    public sealed class GetProblemBySlugQueryHandler
        : IRequestHandler<GetProblemBySlugQuery, ProblemDetailDto?>
    {
        private readonly IProblemRepository _problemRepository;

        public GetProblemBySlugQueryHandler(
            IProblemRepository problemRepository)
        {
            _problemRepository = problemRepository;
        }

        public async Task<ProblemDetailDto?> Handle(
            GetProblemBySlugQuery request,
            CancellationToken cancellationToken)
        {
            var problem = await _problemRepository.GetBySlugAsync(
                request.Slug,
                cancellationToken);

            if (problem is null)
            {
                return null;
            }

            return new ProblemDetailDto
            {
                Id = problem.Id,
                Title = problem.Title,
                Slug = problem.Slug,
                Description = problem.Description,
                Constraints = problem.Constraints,
                TimeLimitInMilliseconds = problem.TimeLimitInMilliseconds,
                MemoryLimitInMegabytes = problem.MemoryLimitInMegabytes,
                DifficultyLevelName = problem.DifficultyLevel.Name,
                ProgrammingDomainName = problem.ProgrammingDomain.Name,
                Tags = problem.ProblemTags
                    .Select(problemTag => problemTag.Tag.Name)
                    .OrderBy(name => name)
                    .ToList(),
                Examples = problem.ProblemExamples
                    .OrderBy(example => example.DisplayOrder)
                    .Select(example => new ProblemExampleDto
                    {
                        DisplayOrder = example.DisplayOrder,
                        Input = example.Input,
                        Output = example.Output,
                        Explanation = example.Explanation
                    })
                    .ToList(),
                TestCases = problem.ProblemTestCases
                    .Where(testCase => !testCase.IsHidden)
                    .OrderBy(testCase => testCase.DisplayOrder)
                    .Select(testCase => new ProblemPublicTestCaseDto
                    {
                        DisplayOrder = testCase.DisplayOrder,
                        Input = testCase.Input,
                        ExpectedOutput = testCase.ExpectedOutput,
                        IsHidden = testCase.IsHidden
                    })
                    .ToList(),
                Boilerplates = problem.ProblemBoilerplates
                    .Select(boilerplate => new ProblemBoilerplateDto
                    {
                        ProgrammingLanguageName = boilerplate.ProgrammingLanguage.Name,
                        TemplateCode = boilerplate.TemplateCode
                    })
                    .ToList(),
                Articles = problem.ProblemArticles
                    .Select(article => new ProblemArticleSummaryDto
                    {
                        Title = article.Title,
                        IsPrimary = article.IsPrimary
                    })
                    .ToList(),
                Videos = problem.ProblemVideos
                    .OrderBy(video => video.DisplayOrder)
                    .Select(video => new ProblemVideoSummaryDto
                    {
                        Title = video.Title,
                        VideoUrl = video.VideoUrl,
                        IsPrimary = video.IsPrimary
                    })
                    .ToList()
            };
        }
    }
}