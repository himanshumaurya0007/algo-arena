using AlgoArena.Domain.Entities.Submissions;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Submissions
{
    /// <summary>
    /// Configures the SubmissionTestCaseResult entity.
    /// </summary>
    public sealed class SubmissionTestCaseResultConfiguration : AuditableEntityConfiguration<SubmissionTestCaseResult>
    {
        public override void Configure(EntityTypeBuilder<SubmissionTestCaseResult> builder)
        {
            base.Configure(builder);

            builder.ToTable("SubmissionTestCaseResults");

            builder.Property(x => x.ExecutionTimeInMilliseconds)
                .HasPrecision(8, 2);

            builder.Property(x => x.ErrorMessage);

            builder.Property(x => x.ActualOutput);

            builder.Property(x => x.ExpectedOutput);

            builder.HasOne(x => x.Submission)
                .WithMany(x => x.SubmissionTestCaseResults)
                .HasForeignKey(x => x.SubmissionId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.ProblemTestCase)
                .WithMany(x => x.SubmissionTestCaseResults)
                .HasForeignKey(x => x.ProblemTestCaseId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}