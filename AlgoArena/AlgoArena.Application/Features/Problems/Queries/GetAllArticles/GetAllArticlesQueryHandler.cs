using AlgoArena.Application.Features.Problems.DTOs.Articles;
using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetAllArticles
{
    public sealed class GetAllArticlesQueryHandler
        : IRequestHandler<GetAllArticlesQuery, IReadOnlyList<AdminArticleDto>>
    {
        private readonly IProblemArticleRepository _articleRepository;

        public GetAllArticlesQueryHandler(
            IProblemArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<IReadOnlyList<AdminArticleDto>> Handle(
            GetAllArticlesQuery request,
            CancellationToken cancellationToken)
        {
            var articles = await _articleRepository.GetAllAsync(cancellationToken);

            return articles
                .Select(article => new AdminArticleDto
                {
                    Id = article.Id,
                    ProblemId = article.ProblemId,
                    ProblemTitle = article.Problem.Title,
                    ProblemSlug = article.Problem.Slug,
                    Title = article.Title,
                    MarkdownContent = article.MarkdownContent,
                    IsPrimary = article.IsPrimary,
                    CreatedAt = article.CreatedAt
                })
                .ToList();
        }
    }
}