using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Domain.Entities.Problems
{
    /// <summary>
    /// Represents the many-to-many relationship between problems and tags.
    /// </summary>
    public sealed class ProblemTag
    {
        /// <summary>
        /// Foreign key to the problem.
        /// </summary>
        public Guid ProblemId { get; set; }

        /// <summary>
        /// Foreign key to the tag.
        /// </summary>
        public Guid TagId { get; set; }


        // Navigation Properties
        public Problem Problem { get; set; } = null!;

        public Tag Tag { get; set; } = null!;
    }
}
