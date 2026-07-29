using AlgoArena.Domain.Common;
using AlgoArena.Domain.Entities.Identity;

namespace AlgoArena.Domain.Entities.Audit
{
    /// <summary>
    /// Represents an audit record for important user and system actions.
    /// </summary>
    public sealed class AuditLog : AuditableEntity
    {
        /// <summary>
        /// User who performed the action.
        /// Null for system-generated events.
        /// </summary>
        public Guid? UserId { get; set; }

        /// <summary>
        /// Name of the entity affected.
        /// Example: Problem, User, Submission.
        /// </summary>
        public string EntityName { get; set; } = string.Empty;

        /// <summary>
        /// Identifier of the affected entity.
        /// </summary>
        public Guid EntityId { get; set; }

        /// <summary>
        /// Action performed.
        /// Example: Create, Update, Delete, Login.
        /// </summary>
        public string ActionName { get; set; } = string.Empty;

        /// <summary>
        /// Additional details describing the action.
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// IP address from which the action originated.
        /// </summary>
        public string? IpAddress { get; set; }

        /// <summary>
        /// Browser or client information.
        /// </summary>
        public string? UserAgent { get; set; }


        // Navigation Property
        public User? User { get; set; }
    }
}