using AlgoArena.Domain.Entities.Lookups;
using AlgoArena.Persistence.Configurations.Common;
using AlgoArena.Persistence.Seeds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Lookups
{
    public sealed class ProgrammingLanguageConfiguration : LookupEntityConfiguration<ProgrammingLanguage>
    {
        public override void Configure(EntityTypeBuilder<ProgrammingLanguage> builder)
        {
            base.Configure(builder);

            builder.ToTable("ProgrammingLanguages");

            builder.HasMany(x => x.ProblemBoilerplates)
                   .WithOne(x => x.ProgrammingLanguage)
                   .HasForeignKey(x => x.ProgrammingLanguageId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.Submissions)
                   .WithOne(x => x.ProgrammingLanguage)
                   .HasForeignKey(x => x.ProgrammingLanguageId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(x => x.Name)
                   .IsUnique();

            // Seed Data
            builder.HasData(ProgrammingLanguageSeed.Data);
        }
    }
}
