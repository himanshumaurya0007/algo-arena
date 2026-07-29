using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Identity;
using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Domain.Entities.Profiles
{
    /// <summary>
    /// Represents the professional details of a user.
    /// </summary>
    public sealed class ProfessionalDetail : AuditableEntity
    {
        /// <summary>
        /// Foreign key to the user.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Foreign key to the professional experience level.
        /// </summary>
        public Guid ExperienceLevelId { get; set; }


        // Navigation Properties
        public User User { get; set; } = null!;

        public ExperienceLevel ExperienceLevel { get; set; } = null!;
    }
}
