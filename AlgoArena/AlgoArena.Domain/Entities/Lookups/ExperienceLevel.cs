using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Profiles;

namespace AlgoArena.Domain.Entities.Lookups
{
    /// <summary>
    /// Represents a professional experience level.
    /// </summary>
    public sealed class ExperienceLevel: LookupEntity
    {
        public ICollection<ProfessionalDetail> ProfessionalDetails { get; set; } = new List<Profiles.ProfessionalDetail>();
    }
}
