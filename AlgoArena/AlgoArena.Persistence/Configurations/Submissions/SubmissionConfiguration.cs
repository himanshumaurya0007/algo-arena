using AlgoArena.Domain.Entities.Submissions;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Submissions
{
    /// <summary>
    /// Configures the Submission entity.
    /// </summary>
    public sealed class SubmissionConfiguration : AuditableEntityConfiguration<Submission>
    {
        public override void Configure(EntityTypeBuilder<Submission> builder)
        {
            base.Configure(builder);

            builder.ToTable("Submissions");

            builder.Property(x => x.SourceCode)
                .IsRequired();

            builder.Property(x => x.StandardOutput);

            builder.Property(x => x.StandardError);

            builder.Property(x => x.CompilationOutput);

            builder.Property(x => x.ExecutionTimeInMilliseconds)
                .HasPrecision(8, 2);

            builder.Property(x => x.JudgeToken)
                .HasMaxLength(100);

            builder.Property(x => x.IsAccepted)
                .HasDefaultValue(false);

            builder.Property(x => x.IsRunCode)
                .HasDefaultValue(false);

            builder.HasOne(x => x.User)
                .WithMany(x => x.Submissions)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Problem)
                .WithMany(x => x.Submissions)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.ProgrammingLanguage)
                .WithMany(x => x.Submissions)
                .HasForeignKey(x => x.ProgrammingLanguageId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.SubmissionStatus)
                .WithMany(x => x.Submissions)
                .HasForeignKey(x => x.SubmissionStatusId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.SubmissionTestCaseResults)
                .WithOne(x => x.Submission)
                .HasForeignKey(x => x.SubmissionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}