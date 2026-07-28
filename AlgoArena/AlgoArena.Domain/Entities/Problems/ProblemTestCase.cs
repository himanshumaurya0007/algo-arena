using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Submissions;

namespace AlgoArena.Domain.Entities.Problems
{
    /// <summary>
    /// Represents a test case for validating a programming problem.
    /// </summary>
    public sealed class ProblemTestCase : AuditableEntity
    {
        /// <summary>
        /// Foreign key to the problem.
        /// </summary>
        public Guid ProblemId { get; set; }

        /// <summary>
        /// Display order of the test case.
        /// </summary>
        public short DisplayOrder { get; set; }

        /// <summary>
        /// Input provided to the user's program.
        /// </summary>
        public string Input { get; set; } = string.Empty;

        /// <summary>
        /// Expected output produced by a correct solution.
        /// </summary>
        public string ExpectedOutput { get; set; } = string.Empty;

        /// <summary>
        /// Indicates whether this test case is hidden from users.
        /// </summary>
        public bool IsHidden { get; set; }


        // Navigation Property
        public Problem Problem { get; set; } = null!;

        // Collection Navigation
        public ICollection<SubmissionTestCaseResult> SubmissionTestCaseResults { get; set; } = new List<SubmissionTestCaseResult>();
    }
}