using AlgoArena.Domain.Common;

namespace AlgoArena.Domain.Entities.Problems
{
    /// <summary>
    /// Represents a YouTube video associated with a programming problem.
    /// </summary>
    public sealed class ProblemVideo : AuditableEntity
    {
        /// <summary>
        /// Foreign key to the problem.
        /// </summary>
        public Guid ProblemId { get; set; }

        /// <summary>
        /// Video title.
        /// </summary>
        public string Title { get; set; } = string.Empty;

        /// <summary>
        /// YouTube video URL.
        /// </summary>
        public string VideoUrl { get; set; } = string.Empty;

        /// <summary>
        /// Display order of the video.
        /// </summary>
        public byte DisplayOrder { get; set; }

        /// <summary>
        /// Indicates whether this is the primary video.
        /// </summary>
        public bool IsPrimary { get; set; }


        // Navigation Property
        public Problem Problem { get; set; } = null!;
    }
}