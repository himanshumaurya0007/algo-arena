namespace AlgoArena.Domain.Common
{
    /// <summary>
    /// Represents the base class for lookup entities.
    /// </summary>
    public abstract class LookupEntity: AuditableEntity
    {
        /// <summary>
        /// Display name of the lookup value.
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Controls the display order in the UI.
        /// </summary>
        public int DisplayOrder { get; set; }

        /// <summary>
        /// Indicates whether the lookup value is active.
        /// </summary>
        public bool IsActive { get; set; }
    }
}
