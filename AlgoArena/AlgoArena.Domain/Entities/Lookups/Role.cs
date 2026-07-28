using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Identity;

namespace AlgoArena.Domain.Entities.Lookups
{
    /// <summary>
    /// Represents a user role.
    /// </summary>
    public sealed class Role: LookupEntity
    {
        public ICollection<User> Users { get; set; } = new List<Identity.User>();
    }
}
