using AlgoArena.Domain.Entities.Profiles;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Profiles
{
    /// <summary>
    /// Configures the ProfessionalDetail entity.
    /// </summary>
    public sealed class ProfessionalDetailConfiguration : AuditableEntityConfiguration<ProfessionalDetail>
    {
        public override void Configure(EntityTypeBuilder<ProfessionalDetail> builder)
        {
            base.Configure(builder);

            builder.ToTable("ProfessionalDetails");

            builder.HasOne(x => x.User)
                .WithOne(x => x.ProfessionalDetail)
                .HasForeignKey<ProfessionalDetail>(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.ExperienceLevel)
                .WithMany(x => x.ProfessionalDetails)
                .HasForeignKey(x => x.ExperienceLevelId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}