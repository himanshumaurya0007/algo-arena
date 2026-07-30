using AlgoArena.Domain.Entities.Lookups;
using AlgoArena.Persistence.Configurations.Common;
using AlgoArena.Persistence.Seeds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Lookups
{
    public sealed class EducationLevelConfiguration : LookupEntityConfiguration<EducationLevel>
    {
        public override void Configure(EntityTypeBuilder<EducationLevel> builder)
        {
            base.Configure(builder);

            builder.ToTable("EducationLevels");

            builder.HasMany(x => x.EducationDetails)
                   .WithOne(x => x.EducationLevel)
                   .HasForeignKey(x => x.EducationLevelId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(x => x.Name)
                   .IsUnique();

            // Seed Data
            builder.HasData(EducationLevelSeed.Data);
        }
    }
}
