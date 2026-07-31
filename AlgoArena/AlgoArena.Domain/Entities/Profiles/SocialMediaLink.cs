using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Identity;

namespace AlgoArena.Domain.Entities.Profiles
{
    /// <summary>
    /// Represents the social media links associated with a user.
    /// </summary>
    public sealed class SocialMediaLink : AuditableEntity
    {
        /// <summary>
        /// Foreign key to the user.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// GitHub profile URL.
        /// </summary>
        public string? GitHubUrl { get; set; }

        /// <summary>
        /// LinkedIn profile URL.
        /// </summary>
        public string? LinkedInUrl { get; set; }

        /// <summary>
        /// Personal portfolio website URL.
        /// </summary>
        public string? PortfolioUrl { get; set; }

        /// <summary>
        /// LeetCode profile URL.
        /// </summary>
        public string? LeetCodeUrl { get; set; }


        // Navigation Properties
        public User User { get; set; } = null!;
    }
}
