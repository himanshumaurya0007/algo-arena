using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Analytics;
using AlgoArena.Domain.Entities.Lookups;
using AlgoArena.Domain.Entities.Submissions;

namespace AlgoArena.Domain.Entities.Problems
{
    /// <summary>
    /// Represents a programming problem available on the platform.
    /// </summary>
    public sealed class Problem : AuditableEntity
    {
        /// <summary>
        /// Foreign key to the programming domain.
        /// </summary>
        public Guid ProgrammingDomainId { get; set; }

        /// <summary>
        /// Foreign key to the difficulty level.
        /// </summary>
        public Guid DifficultyLevelId { get; set; }

        /// <summary>
        /// Title of the problem.
        /// </summary>
        public string Title { get; set; } = string.Empty;

        /// <summary>
        /// URL-friendly unique identifier.
        /// Example: two-sum
        /// </summary>
        public string Slug { get; set; } = string.Empty;

        /// <summary>
        /// Complete problem statement.
        /// </summary>
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// Constraints applicable to the problem.
        /// </summary>
        public string Constraints { get; set; } = string.Empty;

        /// <summary>
        /// Maximum execution time allowed in milliseconds.
        /// </summary>
        public int TimeLimitInMilliseconds { get; set; } = 1000;

        /// <summary>
        /// Maximum memory allowed during execution in megabytes.
        /// </summary>
        public int MemoryLimitInMegabytes { get; set; } = 256;

        /// <summary>
        /// Indicates whether the problem is published.
        /// </summary>
        public bool IsPublished { get; set; }

        /// <summary>
        /// Number of times the problem has been solved.
        /// </summary>
        public int SolvedCount { get; set; }

        /// <summary>
        /// Number of times the problem has been attempted.
        /// </summary>
        public int AttemptCount { get; set; }


        // Navigation Properties
        public ProgrammingDomain ProgrammingDomain { get; set; } = null!;

        public DifficultyLevel DifficultyLevel { get; set; } = null!;


        // Collection Navigation
        public ICollection<ProblemTag> ProblemTags { get; set; } = new List<ProblemTag>();

        public ICollection<ProblemExample> ProblemExamples { get; set; } = new List<ProblemExample>();

        public ICollection<ProblemHint> ProblemHints { get; set; } = new List<ProblemHint>();

        public ICollection<ProblemBoilerplate> ProblemBoilerplates { get; set; } = new List<ProblemBoilerplate>();

        public ICollection<ProblemTestCase> ProblemTestCases { get; set; } = new List<ProblemTestCase>();

        public ICollection<ProblemArticle> ProblemArticles { get; set; } = new List<ProblemArticle>();

        public ICollection<ProblemVideo> ProblemVideos { get; set; } = new List<ProblemVideo>();

        public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
        
        public ICollection<UserProblem> UserProblems { get; set; } = new List<UserProblem>();
    }
}