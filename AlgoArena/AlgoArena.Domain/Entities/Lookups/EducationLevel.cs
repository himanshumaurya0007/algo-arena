using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Profiles;

namespace AlgoArena.Domain.Entities.Lookups
{
    /// <summary>
    /// Represents an education level.
    /// </summary>
    public sealed class EducationLevel: LookupEntity
    {
        public ICollection<EducationDetail> EducationDetails { get; set; } = new List<Profiles.EducationDetail>();
    }
}
