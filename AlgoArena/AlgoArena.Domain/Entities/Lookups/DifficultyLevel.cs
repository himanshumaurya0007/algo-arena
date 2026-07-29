using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Domain.Entities.Lookups
{
    /// <summary>
    /// Represents the difficulty level of a programming problem.
    /// </summary>
    public sealed class DifficultyLevel : LookupEntity
    {
        public ICollection<Problem> Problems { get; set; } = new List<Problem>();
    }
}
