using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Identity;
using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Domain.Entities.Profiles
{
    /// <summary>
    /// Represents the personal profile information of a user.
    /// </summary>
    public sealed class UserProfile : AuditableEntity
    {
        /// <summary>
        /// Foreign key to User.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// URL of the user's profile picture.
        /// </summary>
        public string? ProfilePictureUrl { get; set; }

        /// <summary>
        /// User's first name.
        /// </summary>
        public string FirstName { get; set; } = string.Empty;

        /// <summary>
        /// User's middle name.
        /// </summary>
        public string? MiddleName { get; set; }

        /// <summary>
        /// User's last name.
        /// </summary>
        public string LastName { get; set; } = string.Empty;

        /// <summary>
        /// International dialing code.
        /// </summary>
        public string? CountryCode { get; set; }

        /// <summary>
        /// User's phone number.
        /// </summary>
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Foreign key to Gender lookup.
        /// </summary>
        public Guid GenderId { get; set; }

        /// <summary>
        /// User's date of birth.
        /// </summary>
        public DateOnly? DateOfBirth { get; set; }

        /// <summary>
        /// User biography.
        /// </summary>
        public string? Bio { get; set; }


        // Navigation Properties
        public User User { get; set; } = null!;

        public Gender Gender { get; set; } = null!;
    }
}
