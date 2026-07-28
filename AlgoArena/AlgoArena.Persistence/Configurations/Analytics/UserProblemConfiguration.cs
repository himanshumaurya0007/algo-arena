using AlgoArena.Domain.Entities.Analytics;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Analytics
{
    /// <summary>
    /// Configures the UserProblem entity.
    /// </summary>
    public sealed class UserProblemConfiguration : AuditableEntityConfiguration<UserProblem>
    {
        public override void Configure(EntityTypeBuilder<UserProblem> builder)
        {
            base.Configure(builder);

            builder.ToTable("UserProblems");

            builder.Property(x => x.SubmissionCount)
                .HasDefaultValue(0);

            builder.Property(x => x.IsAttempted)
                .HasDefaultValue(false);

            builder.Property(x => x.IsSolved)
                .HasDefaultValue(false);

            builder.HasIndex(x => new
            {
                x.UserId,
                x.ProblemId
            })
            .IsUnique();

            builder.HasOne(x => x.User)
                .WithMany(x => x.UserProblems)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Problem)
                .WithMany(x => x.UserProblems)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}