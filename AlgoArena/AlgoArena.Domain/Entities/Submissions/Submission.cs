using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Identity;
using AlgoArena.Domain.Entities.Lookups;
using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Domain.Entities.Submissions
{
    /// <summary>
    /// Represents a code submission made by a user.
    /// </summary>
    public sealed class Submission : AuditableEntity
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
        /// Foreign key to the programming language.
        /// </summary>
        public Guid ProgrammingLanguageId { get; set; }

        /// <summary>
        /// Foreign key to the submission status.
        /// </summary>
        public Guid SubmissionStatusId { get; set; }

        /// <summary>
        /// Complete source code submitted by the user.
        /// </summary>
        public string SourceCode { get; set; } = string.Empty;

        /// <summary>
        /// Standard output returned by the judge.
        /// </summary>
        public string? StandardOutput { get; set; }

        /// <summary>
        /// Standard error returned by the judge.
        /// </summary>
        public string? StandardError { get; set; }

        /// <summary>
        /// Compilation output returned by the judge.
        /// </summary>
        public string? CompilationOutput { get; set; }

        /// <summary>
        /// Execution time in milliseconds.
        /// </summary>
        public decimal? ExecutionTimeInMilliseconds { get; set; }

        /// <summary>
        /// Peak memory usage in kilobytes.
        /// </summary>
        public int? MemoryUsedInKilobytes { get; set; }

        /// <summary>
        /// Judge0 submission token.
        /// </summary>
        public string? JudgeToken { get; set; }

        /// <summary>
        /// Indicates whether this submission passed all test cases.
        /// </summary>
        public bool IsAccepted { get; set; }

        /// <summary>
        /// Indicates whether this submission was executed using the "Run Code" feature instead of a full submission.
        /// </summary>
        public bool IsRunCode { get; set; }


        // Navigation Properties
        public User User { get; set; } = null!;

        public Problem Problem { get; set; } = null!;

        public ProgrammingLanguage ProgrammingLanguage { get; set; } = null!;

        public SubmissionStatus SubmissionStatus { get; set; } = null!;


        // Collection Navigation
        public ICollection<SubmissionTestCaseResult> SubmissionTestCaseResults { get; set; } = new List<SubmissionTestCaseResult>();
    }
}