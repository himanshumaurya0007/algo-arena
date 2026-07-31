using AlgoArena.Domain.Entities.Problems;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AlgoArena.Persistence.Seeds;

namespace AlgoArena.Persistence.Configurations.Problems
{
    public sealed class ProblemExampleConfiguration : AuditableEntityConfiguration<ProblemExample>
    {
        public override void Configure(EntityTypeBuilder<ProblemExample> builder)
        {
            base.Configure(builder);

            builder.ToTable("ProblemExamples");

            builder.HasData(ProblemExampleSeed.Data);

            builder.Property(x => x.ImageUrl)
                .HasMaxLength(500);

            builder.Property(x => x.Input)
                .IsRequired();

            builder.Property(x => x.Output)
                .IsRequired();

            builder.HasOne(x => x.Problem)
                .WithMany(x => x.ProblemExamples)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}