using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Problems;
using AlgoArena.Domain.Entities.Submissions;

namespace AlgoArena.Domain.Entities.Lookups
{
    /// <summary>
    /// Represents a programming language supported by AlgoArena.
    /// </summary>
    public sealed class ProgrammingLanguage : LookupEntity
    {
        public ICollection<ProblemBoilerplate> ProblemBoilerplates { get; set; } = new List<ProblemBoilerplate>();

        public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
    }
}
