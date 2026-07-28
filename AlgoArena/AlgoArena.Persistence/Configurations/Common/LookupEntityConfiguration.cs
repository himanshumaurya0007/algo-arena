using AlgoArena.Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Common
{
    /// <summary>
    /// Provides common Entity Framework configuration for lookup entities.
    /// </summary>
    public abstract class LookupEntityConfiguration<TEntity> : AuditableEntityConfiguration<TEntity> where TEntity : LookupEntity
    {
        public override void Configure(EntityTypeBuilder<TEntity> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.Name)
                   .HasMaxLength(100)
                   .IsRequired();

            builder.Property(x => x.DisplayOrder)
                   .IsRequired();

            builder.Property(x => x.IsActive)
                   .HasDefaultValue(true);
        }
    }
}