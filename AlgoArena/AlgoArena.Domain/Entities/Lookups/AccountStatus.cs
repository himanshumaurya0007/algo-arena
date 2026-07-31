using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Identity;

namespace AlgoArena.Domain.Entities.Lookups
{
    /// <summary>
    /// Represents the status of a user account.
    /// </summary>
    public sealed class AccountStatus: LookupEntity
    {
        /// <summary>
        /// Users associated with this account status.
        /// </summary>
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
