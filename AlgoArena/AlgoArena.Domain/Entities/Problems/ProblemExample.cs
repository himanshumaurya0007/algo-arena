using AlgoArena.Domain.Common;

namespace AlgoArena.Domain.Entities.Problems
{
    /// <summary>
    /// Represents an example for a programming problem.
    /// </summary>
    public sealed class ProblemExample : AuditableEntity
    {
        /// <summary>
        /// Foreign key to the problem.
        /// </summary>
        public Guid ProblemId { get; set; }

        /// <summary>
        /// Display order of the example.
        /// </summary>
        public byte DisplayOrder { get; set; }


        /// <summary>
        /// Image used in the problem.
        /// </summary>
        public string? ImageUrl { get; set; }

        /// <summary>
        /// Example input.
        /// </summary>
        public string Input { get; set; } = string.Empty;

        /// <summary>
        /// Expected output.
        /// </summary>
        public string Output { get; set; } = string.Empty;

        /// <summary>
        /// Explanation of the example.
        /// </summary>
        public string? Explanation { get; set; }


        // Navigation Property
        public Problem Problem { get; set; } = null!;
    }
}