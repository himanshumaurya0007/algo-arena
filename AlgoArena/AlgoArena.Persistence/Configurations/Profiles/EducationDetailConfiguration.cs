using AlgoArena.Domain.Entities.Profiles;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Profiles
{
    /// <summary>
    /// Configures the EducationDetail entity.
    /// </summary>
    public sealed class EducationDetailConfiguration : AuditableEntityConfiguration<EducationDetail>
    {
        public override void Configure(EntityTypeBuilder<EducationDetail> builder)
        {
            base.Configure(builder);

            builder.ToTable("EducationDetails");

            builder.Property(x => x.InstituteName)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(x => x.Degree)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(x => x.Branch)
                .IsRequired()
                .HasMaxLength(150);

            builder.HasOne(x => x.User)
                .WithMany(x => x.EducationDetails)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.EducationLevel)
                .WithMany(x => x.EducationDetails)
                .HasForeignKey(x => x.EducationLevelId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}