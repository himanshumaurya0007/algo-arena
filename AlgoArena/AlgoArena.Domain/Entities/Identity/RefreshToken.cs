using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Audit;

namespace AlgoArena.Domain.Entities.Identity
{
    /// <summary>
    /// Represents a refresh token issued to an authenticated user.
    /// </summary>
    public sealed class RefreshToken: AuditableEntity
    {
        /// <summary>
        /// Foreign key to the user who owns this refresh token.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// The refresh token value.
        /// </summary>
        public string TokenHash { get; set; } = string.Empty;

        /// <summary>
        /// Date and time when the token expires.
        /// </summary>
        public DateTime ExpiresAt { get; set; }

        /// <summary>
        /// Indicates whether the token has been revoked.
        /// </summary>
        public bool IsRevoked { get; set; }

        /// <summary>
        /// Date and time when the token was revoked.
        /// </summary>
        public DateTime? RevokedAt { get; set; }

        /// <summary>
        /// Replacement refresh token during token rotation.
        /// </summary>
        public string? ReplacedByToken { get; set; }


        // Navigation Properties
        public User User { get; set; } = null!;
    }
}
