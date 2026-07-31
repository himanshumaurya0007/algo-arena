using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Submissions;

namespace AlgoArena.Domain.Entities.Lookups
{
    /// <summary>
    /// Represents the execution status of a code submission.
    /// </summary>
    public sealed class SubmissionStatus : LookupEntity
    {
        public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
    }
}