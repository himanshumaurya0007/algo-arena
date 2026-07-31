using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.CreateArticle
{
    public sealed record CreateArticleCommand : IRequest<Guid>
    {
        public Guid ProblemId { get; init; }

        public string Title { get; init; } = string.Empty;

        public string MarkdownContent { get; init; } = string.Empty;

        public bool IsPrimary { get; init; }
    }
}