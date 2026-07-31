namespace AlgoArena.Application.Features.Problems.DTOs
{
    public sealed class ProblemArticleDto
    {
        public Guid Id { get; set; }

        public Guid ProblemId { get; set; }

        public string ProblemTitle { get; set; } = string.Empty;

        public string ProblemSlug { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public string MarkdownContent { get; set; } = string.Empty;

        public bool IsPrimary { get; set; }
    }
}