using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Domain.Entities.Submissions
{
    /// <summary>
    /// Represents the execution result of a submission
    /// against a single test case.
    /// </summary>
    public sealed class SubmissionTestCaseResult : AuditableEntity
    {
        /// <summary>
        /// Foreign key to the submission.
        /// </summary>
        public Guid SubmissionId { get; set; }

        /// <summary>
        /// Foreign key to the problem test case.
        /// </summary>
        public Guid ProblemTestCaseId { get; set; }

        /// <summary>
        /// Indicates whether this test case passed.
        /// </summary>
        public bool IsPassed { get; set; }

        /// <summary>
        /// Output produced by the submitted program.
        /// </summary>
        public string? ActualOutput { get; set; }

        /// <summary>
        /// Expected output of the test case.
        /// </summary>
        public string? ExpectedOutput { get; set; }

        /// <summary>
        /// Execution time in milliseconds.
        /// </summary>
        public decimal? ExecutionTimeInMilliseconds { get; set; }

        /// <summary>
        /// Memory consumed in kilobytes.
        /// </summary>
        public int? MemoryUsedInKilobytes { get; set; }

        /// <summary>
        /// Error message returned during execution.
        /// </summary>
        public string? ErrorMessage { get; set; }


        // Navigation Properties
        public Submission Submission { get; set; } = null!;

        public ProblemTestCase ProblemTestCase { get; set; } = null!;
    }
}