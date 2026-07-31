using AlgoArena.Application.Features.Problems.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.DeleteArticle
{
    public sealed class DeleteArticleCommandHandler
        : IRequestHandler<DeleteArticleCommand>
    {
        private readonly IProblemArticleRepository _articleRepository;

        public DeleteArticleCommandHandler(
            IProblemArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task Handle(
            DeleteArticleCommand request,
            CancellationToken cancellationToken)
        {
            await _articleRepository.SoftDeleteAsync(
                request.Id,
                cancellationToken);
        }
    }
}