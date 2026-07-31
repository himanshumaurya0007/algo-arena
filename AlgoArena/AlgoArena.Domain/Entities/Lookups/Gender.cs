using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Profiles;

namespace AlgoArena.Domain.Entities.Lookups
{
    /// <summary>
    /// Represents a gender lookup value.
    /// </summary>
    public sealed class Gender: LookupEntity
    {
        public ICollection<UserProfile> UserProfiles { get; set; } = new List<Profiles.UserProfile>();
    }
}
