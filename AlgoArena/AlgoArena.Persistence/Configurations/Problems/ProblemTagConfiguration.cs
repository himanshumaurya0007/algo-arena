using AlgoArena.Domain.Entities.Problems;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AlgoArena.Persistence.Seeds;

namespace AlgoArena.Persistence.Configurations.Problems
{
    public sealed class ProblemTagConfiguration : IEntityTypeConfiguration<ProblemTag>
    {
        public void Configure(EntityTypeBuilder<ProblemTag> builder)
        {
            builder.ToTable("ProblemTags");

            builder.HasData(ProblemTagSeed.Data);

            builder.HasKey(x => new
            {
                x.ProblemId,
                x.TagId
            });

            builder.HasOne(x => x.Problem)
                .WithMany(x => x.ProblemTags)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Tag)
                .WithMany(x => x.ProblemTags)
                .HasForeignKey(x => x.TagId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}