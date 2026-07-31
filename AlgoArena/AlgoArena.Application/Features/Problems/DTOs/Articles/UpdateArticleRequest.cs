namespace AlgoArena.Application.Features.Problems.DTOs.Articles
{
    public sealed class UpdateArticleRequest
    {
        public Guid Id { get; set; }

        public Guid ProblemId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string MarkdownContent { get; set; } = string.Empty;

        public bool IsPrimary { get; set; }
    }
}