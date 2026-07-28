using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Analytics;

namespace AlgoArena.Domain.Entities.Problems
{
    /// <summary>
    /// Represents an article associated with a programming problem.
    /// </summary>
    public sealed class ProblemArticle : AuditableEntity
    {
        /// <summary>
        /// Foreign key to the problem.
        /// </summary>
        public Guid ProblemId { get; set; }

        /// <summary>
        /// Article title.
        /// </summary>
        public string Title { get; set; } = string.Empty;

        /// <summary>
        /// Markdown content of the article.
        /// </summary>
        public string MarkdownContent { get; set; } = string.Empty;

        /// <summary>
        /// Indicates whether this is the primary article.
        /// </summary>
        public bool IsPrimary { get; set; }


        // Navigation Property
        public Problem Problem { get; set; } = null!;
    }
}