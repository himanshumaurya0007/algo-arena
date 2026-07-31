using AlgoArena.Domain.Entities.Problems;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AlgoArena.Persistence.Seeds;

namespace AlgoArena.Persistence.Configurations.Problems
{
    public sealed class ProblemVideoConfiguration : AuditableEntityConfiguration<ProblemVideo>
    {
        public override void Configure(EntityTypeBuilder<ProblemVideo> builder)
        {
            base.Configure(builder);

            builder.ToTable("ProblemVideos");

            builder.HasData(ProblemVideoSeed.Data);

            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(250);

            builder.Property(x => x.VideoUrl)
                .IsRequired()
                .HasMaxLength(500);

            builder.HasOne(x => x.Problem)
                .WithMany(x => x.ProblemVideos)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}