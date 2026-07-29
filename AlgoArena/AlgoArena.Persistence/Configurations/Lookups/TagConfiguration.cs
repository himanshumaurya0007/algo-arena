using AlgoArena.Domain.Entities.Lookups;
using AlgoArena.Persistence.Configurations.Common;
using AlgoArena.Persistence.Seeds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Lookups
{
    public sealed class TagConfiguration : LookupEntityConfiguration<Tag>
    {
        public override void Configure(EntityTypeBuilder<Tag> builder)
        {
            base.Configure(builder);

            builder.ToTable("Tags");

            builder.HasMany(x => x.ProblemTags)
                   .WithOne(x => x.Tag)
                   .HasForeignKey(x => x.TagId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(x => x.Name)
                   .IsUnique();

            // Seed Data
            builder.HasData(TagSeed.Data);
        }
    }
}
