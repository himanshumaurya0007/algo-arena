using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Domain.Entities.Lookups
{
    /// <summary>
    /// Represents a programming domain used to classify coding problems.
    /// </summary>
    public sealed class ProgrammingDomain : LookupEntity
    {
        public ICollection<Problem> Problems { get; set; } = new List<Problem>();
    }
}
