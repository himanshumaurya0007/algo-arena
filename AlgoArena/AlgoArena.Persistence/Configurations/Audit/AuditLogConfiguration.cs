using AlgoArena.Domain.Entities.Audit;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Audit
{
    /// <summary>
    /// Configures the AuditLog entity.
    /// </summary>
    public sealed class AuditLogConfiguration : AuditableEntityConfiguration<AuditLog>
    {
        public override void Configure(EntityTypeBuilder<AuditLog> builder)
        {
            base.Configure(builder);

            builder.ToTable("AuditLogs");

            builder.Property(x => x.EntityName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.ActionName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Description);

            builder.Property(x => x.IpAddress)
                .HasMaxLength(45);

            builder.Property(x => x.UserAgent)
                .HasMaxLength(1000);

            builder.HasOne(x => x.User)
                .WithMany(x => x.AuditLogs)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}