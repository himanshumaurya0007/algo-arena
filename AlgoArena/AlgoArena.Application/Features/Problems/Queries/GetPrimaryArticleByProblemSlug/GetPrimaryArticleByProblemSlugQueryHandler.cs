using AlgoArena.Application.Features.Problems.DTOs;
using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetPrimaryArticleByProblemSlug
{
    public sealed class GetPrimaryArticleByProblemSlugQueryHandler
        : IRequestHandler<GetPrimaryArticleByProblemSlugQuery, ProblemArticleDto?>
    {
        private readonly IProblemArticleRepository _articleRepository;

        public GetPrimaryArticleByProblemSlugQueryHandler(
            IProblemArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<ProblemArticleDto?> Handle(
            GetPrimaryArticleByProblemSlugQuery request,
            CancellationToken cancellationToken)
        {
            var article = await _articleRepository.GetPrimaryByProblemSlugAsync(
                request.ProblemSlug,
                cancellationToken);

            if (article is null)
            {
                return null;
            }

            return new ProblemArticleDto
            {
                Id = article.Id,
                ProblemId = article.ProblemId,
                ProblemTitle = article.Problem.Title,
                ProblemSlug = article.Problem.Slug,
                Title = article.Title,
                MarkdownContent = article.MarkdownContent,
                IsPrimary = article.IsPrimary
            };
        }
    }
}