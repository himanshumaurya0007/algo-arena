namespace AlgoArena.Application.Features.Problems.DTOs.Articles
{
    public sealed class AdminArticleDto
    {
        public Guid Id { get; set; }

        public Guid ProblemId { get; set; }

        public string ProblemTitle { get; set; } = string.Empty;

        public string ProblemSlug { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public string MarkdownContent { get; set; } = string.Empty;

        public bool IsPrimary { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}