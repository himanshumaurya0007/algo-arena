using AlgoArena.Domain.Entities.Problems;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Problems
{
    public sealed class ProblemTestCaseConfiguration : AuditableEntityConfiguration<ProblemTestCase>
    {
        public override void Configure(EntityTypeBuilder<ProblemTestCase> builder)
        {
            base.Configure(builder);

            builder.ToTable("ProblemTestCases");

            builder.Property(x => x.Input)
                .IsRequired();

            builder.Property(x => x.ExpectedOutput)
                .IsRequired();

            builder.HasOne(x => x.Problem)
                .WithMany(x => x.ProblemTestCases)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.SubmissionTestCaseResults)
                .WithOne(x => x.ProblemTestCase)
                .HasForeignKey(x => x.ProblemTestCaseId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}