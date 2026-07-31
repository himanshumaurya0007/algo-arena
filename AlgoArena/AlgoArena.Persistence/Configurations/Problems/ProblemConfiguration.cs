using AlgoArena.Domain.Entities.Problems;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AlgoArena.Persistence.Seeds;

namespace AlgoArena.Persistence.Configurations.Problems
{
    /// <summary>
    /// Configures the Problem entity.
    /// </summary>
    public sealed class ProblemConfiguration : AuditableEntityConfiguration<Problem>
    {
        public override void Configure(EntityTypeBuilder<Problem> builder)
        {
            base.Configure(builder);

            builder.ToTable("Problems");

            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(x => x.Slug)
                .IsRequired()
                .HasMaxLength(250);

            builder.HasIndex(x => x.Slug)
                .IsUnique();

            builder.HasData(ProblemSeed.Data);

            builder.Property(x => x.Description)
                .IsRequired();

            builder.Property(x => x.Constraints)
                .IsRequired();

            builder.HasOne(x => x.ProgrammingDomain)
                .WithMany(x => x.Problems)
                .HasForeignKey(x => x.ProgrammingDomainId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DifficultyLevel)
                .WithMany(x => x.Problems)
                .HasForeignKey(x => x.DifficultyLevelId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.ProblemExamples)
                .WithOne(x => x.Problem)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.ProblemHints)
                .WithOne(x => x.Problem)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.ProblemBoilerplates)
                .WithOne(x => x.Problem)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.ProblemTestCases)
                .WithOne(x => x.Problem)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.ProblemArticles)
                .WithOne(x => x.Problem)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.ProblemVideos)
                .WithOne(x => x.Problem)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Submissions)
                .WithOne(x => x.Problem)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}