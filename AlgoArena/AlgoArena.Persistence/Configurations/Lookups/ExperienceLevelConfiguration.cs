using AlgoArena.Domain.Entities.Lookups;
using AlgoArena.Persistence.Configurations.Common;
using AlgoArena.Persistence.Seeds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Lookups
{
    public sealed class ExperienceLevelConfiguration : LookupEntityConfiguration<ExperienceLevel>
    {
        public void Configure(EntityTypeBuilder<ExperienceLevel> builder)
        {
            base.Configure(builder);

            builder.ToTable("ExperienceLevels");

            builder.HasMany(x => x.ProfessionalDetails)
                   .WithOne(x => x.ExperienceLevel)
                   .HasForeignKey(x => x.ExperienceLevelId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(x => x.Name)
                   .IsUnique();

            // Seed Data
            builder.HasData(ExperienceLevelSeed.Data);
        }
    }
}
