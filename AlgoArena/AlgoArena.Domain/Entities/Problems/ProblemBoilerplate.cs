using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Domain.Entities.Problems
{
    /// <summary>
    /// Represents starter code for a problem in a specific programming language.
    /// </summary>
    public sealed class ProblemBoilerplate : AuditableEntity
    {
        /// <summary>
        /// Foreign key to the problem.
        /// </summary>
        public Guid ProblemId { get; set; }

        /// <summary>
        /// Foreign key to the programming language.
        /// </summary>
        public Guid ProgrammingLanguageId { get; set; }

        /// <summary>
        /// Starter code displayed in the code editor.
        /// </summary>
        public string TemplateCode { get; set; } = string.Empty;


        // Navigation Properties
        public Problem Problem { get; set; } = null!;

        public ProgrammingLanguage ProgrammingLanguage { get; set; } = null!;
    }
}