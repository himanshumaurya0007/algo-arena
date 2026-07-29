using AlgoArena.Domain.Common;

namespace AlgoArena.Domain.Entities.Problems
{
    /// <summary>
    /// Represents a hint for a programming problem.
    /// </summary>
    public sealed class ProblemHint : AuditableEntity
    {
        /// <summary>
        /// Foreign key to the problem.
        /// </summary>
        public Guid ProblemId { get; set; }

        /// <summary>
        /// Display order of the hint.
        /// </summary>
        public byte DisplayOrder { get; set; }

        /// <summary>
        /// Hint text.
        /// </summary>
        public string Hint { get; set; } = string.Empty;


        // Navigation Property
        public Problem Problem { get; set; } = null!;
    }
}