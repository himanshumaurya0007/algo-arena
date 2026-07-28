using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Audit;
using AlgoArena.Domain.Entities.Identity;
using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Domain.Entities.Analytics
{
    /// <summary>
    /// Represents a user's progress for a programming problem.
    /// </summary>
    public sealed class UserProblem : AuditableEntity
    {
        /// <summary>
        /// Foreign key to the user.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Foreign key to the problem.
        /// </summary>
        public Guid ProblemId { get; set; }

        /// <summary>
        /// Indicates whether the user has attempted the problem.
        /// </summary>
        public bool IsAttempted { get; set; }

        /// <summary>
        /// Indicates whether the user has solved the problem.
        /// </summary>
        public bool IsSolved { get; set; }

        /// <summary>
        /// Total number of submissions made by the user.
        /// </summary>
        public int SubmissionCount { get; set; }

        /// <summary>
        /// Date and time of the user's latest submission.
        /// </summary>
        public DateTime? LastSubmittedAt { get; set; }

        /// <summary>
        /// Date and time when the user first solved the problem.
        /// </summary>
        public DateTime? SolvedAt { get; set; }


        // Navigation Properties
        public User User { get; set; } = null!;

        public Problem Problem { get; set; } = null!;
    }
}