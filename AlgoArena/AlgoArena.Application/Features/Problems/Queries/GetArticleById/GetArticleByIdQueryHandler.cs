using AlgoArena.Application.Features.Problems.DTOs.Articles;
using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetArticleById
{
    public sealed class GetArticleByIdQueryHandler
        : IRequestHandler<GetArticleByIdQuery, AdminArticleDto?>
    {
        private readonly IProblemArticleRepository _articleRepository;

        public GetArticleByIdQueryHandler(
            IProblemArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<AdminArticleDto?> Handle(
            GetArticleByIdQuery request,
            CancellationToken cancellationToken)
        {
            var article = await _articleRepository.GetByIdAsync(
                request.Id,
                cancellationToken);

            if (article is null)
            {
                return null;
            }

            return new AdminArticleDto
            {
                Id = article.Id,
                ProblemId = article.ProblemId,
                ProblemTitle = article.Problem.Title,
                ProblemSlug = article.Problem.Slug,
                Title = article.Title,
                MarkdownContent = article.MarkdownContent,
                IsPrimary = article.IsPrimary,
                CreatedAt = article.CreatedAt
            };
        }
    }
}