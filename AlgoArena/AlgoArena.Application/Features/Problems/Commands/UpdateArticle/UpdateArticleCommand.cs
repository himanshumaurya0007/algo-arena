using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.UpdateArticle
{
    public sealed record UpdateArticleCommand : IRequest<Guid>
    {
        public Guid Id { get; init; }

        public Guid ProblemId { get; init; }

        public string Title { get; init; } = string.Empty;

        public string MarkdownContent { get; init; } = string.Empty;

        public bool IsPrimary { get; init; }
    }
}