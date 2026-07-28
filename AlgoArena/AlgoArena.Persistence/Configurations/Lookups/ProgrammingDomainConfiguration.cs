using AlgoArena.Domain.Entities.Lookups;
using AlgoArena.Persistence.Configurations.Common;
using AlgoArena.Persistence.Seeds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Lookups
{
    public sealed class ProgrammingDomainConfiguration : LookupEntityConfiguration<ProgrammingDomain>
    {
        public override void Configure(EntityTypeBuilder<ProgrammingDomain> builder)
        {
            base.Configure(builder);

            builder.ToTable("ProgrammingDomains");

            builder.HasMany(x => x.Problems)
                   .WithOne(x => x.ProgrammingDomain)
                   .HasForeignKey(x => x.ProgrammingDomainId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(x => x.Name)
                   .IsUnique();

            // Seed Data
            builder.HasData(ProgrammingDomainSeed.Data);
        }
    }
}
