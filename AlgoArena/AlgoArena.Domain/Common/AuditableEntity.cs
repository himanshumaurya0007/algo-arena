namespace AlgoArena.Domain.Common
{
    /// <summary>
    /// Represents an auditable entity with creation,
    /// modification, and soft deletion metadata.
    /// </summary>
    public abstract class AuditableEntity: BaseEntity
    {
        /// <summary>
        /// Date and time when the entity was created (UTC).
        /// </summary>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Identifier of the user who created the entity.
        /// </summary>
        public Guid? CreatedBy { get; set; }

        /// <summary>
        /// Date and time of the most recent update (UTC).
        /// </summary>
        public DateTime? UpdatedAt { get; set; }

        /// <summary>
        /// Identifier of the user who last updated the entity.
        /// </summary>
        public Guid? UpdatedBy { get; set; }

        /// <summary>
        /// Indicates whether the entity has been soft deleted.
        /// </summary>
        public bool IsDeleted { get; set; } = false;

        /// <summary>
        /// Date and time when the entity was soft deleted (UTC).
        /// </summary>
        public DateTime? DeletedAt { get; set; }

        /// <summary>
        /// Identifier of the user who performed the soft delete.
        /// </summary>
        public Guid? DeletedBy { get; set; }
    }
}
