using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Identity;
using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Domain.Entities.Profiles
{
    /// <summary>
    /// Represents an educational qualification of a user.
    /// </summary>
    public sealed class EducationDetail : AuditableEntity
    {
        /// <summary>
        /// Foreign key to the user.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Foreign key to the education level.
        /// </summary>
        public Guid EducationLevelId { get; set; }

        /// <summary>
        /// Name of the educational institution.
        /// </summary>
        public string InstituteName { get; set; } = string.Empty;

        /// <summary>
        /// Degree or qualification name.
        /// </summary>
        public string Degree { get; set; } = string.Empty;

        /// <summary>
        /// Branch or specialization.
        /// </summary>
        public string Branch { get; set; } = string.Empty;

        /// <summary>
        /// Calendar year in which the qualification was completed.
        /// </summary>
        public ushort PassingYear { get; set; }

        /// <summary>
        /// Indicates whether this is the primary education record.
        /// </summary>
        public bool IsPrimary { get; set; }


        // Navigation Properties
        public User User { get; set; } = null!;

        public EducationLevel EducationLevel { get; set; } = null!;
    }
}
