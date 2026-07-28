using AlgoArena.Domain.Entities.Lookups;
using AlgoArena.Persistence.Configurations.Common;
using AlgoArena.Persistence.Seeds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Lookups
{
    public sealed class GenderConfiguration : LookupEntityConfiguration<Gender>
    {
        public void Configure(EntityTypeBuilder<Gender> builder)
        {
            base.Configure(builder);

            builder.ToTable("Genders");

            builder.HasMany(x => x.UserProfiles)
                   .WithOne(x => x.Gender)
                   .HasForeignKey(x => x.GenderId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(x => x.Name)
                   .IsUnique();

            // Seed Data
            builder.HasData(GenderSeed.Data);
        }
    }
}
