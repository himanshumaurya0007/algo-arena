using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Domain.Entities.Lookups
{
    /// <summary>
    /// Represents a tag used to categorize programming problems.
    /// </summary>
    public sealed class Tag : LookupEntity
    {
        public ICollection<ProblemTag> ProblemTags { get; set; } = new List<ProblemTag>();
    }
}
