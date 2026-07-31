using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.UpdateArticle
{
    public sealed class UpdateArticleCommandHandler
        : IRequestHandler<UpdateArticleCommand, Guid>
    {
        private readonly IProblemArticleRepository _articleRepository;

        public UpdateArticleCommandHandler(
            IProblemArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<Guid> Handle(
            UpdateArticleCommand request,
            CancellationToken cancellationToken)
        {
            var article = await _articleRepository.GetByIdAsync(
                request.Id,
                cancellationToken);

            if (article is null)
            {
                throw new KeyNotFoundException(
                    $"Article '{request.Id}' was not found.");
            }

            article.ProblemId = request.ProblemId;
            article.Title = request.Title.Trim();
            article.MarkdownContent = request.MarkdownContent.Trim();
            article.IsPrimary = request.IsPrimary;
            article.UpdatedAt = DateTime.UtcNow;

            if (article.IsPrimary)
            {
                await _articleRepository.ClearPrimaryForProblemAsync(
                    article.ProblemId,
                    article.Id,
                    cancellationToken);
            }

            await _articleRepository.UpdateAsync(
                article,
                cancellationToken);

            return article.Id;
        }
    }
}