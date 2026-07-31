using AlgoArena.Application.Features.Problems.Interfaces;
using AlgoArena.Domain.Entities.Problems;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.CreateArticle
{
    public sealed class CreateArticleCommandHandler
        : IRequestHandler<CreateArticleCommand, Guid>
    {
        private readonly IProblemArticleRepository _articleRepository;

        public CreateArticleCommandHandler(
            IProblemArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<Guid> Handle(
            CreateArticleCommand request,
            CancellationToken cancellationToken)
        {
            var article = new ProblemArticle
            {
                Id = Guid.NewGuid(),
                ProblemId = request.ProblemId,
                Title = request.Title.Trim(),
                MarkdownContent = request.MarkdownContent.Trim(),
                IsPrimary = request.IsPrimary
            };

            if (article.IsPrimary)
            {
                await _articleRepository.ClearPrimaryForProblemAsync(
                    article.ProblemId,
                    null,
                    cancellationToken);
            }

            await _articleRepository.AddAsync(
                article,
                cancellationToken);

            return article.Id;
        }
    }
}