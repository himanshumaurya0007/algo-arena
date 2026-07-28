namespace AlgoArena.Domain.Common
{
    /// <summary>
    /// Represents the base class for all domain entities.
    /// Provides the primary key shared by all entities.
    /// </summary>
    public abstract class BaseEntity
    {
        /// <summary>
        /// Unique identifier for the entity.
        /// </summary>
        public Guid Id { get; set; }
    }
}
