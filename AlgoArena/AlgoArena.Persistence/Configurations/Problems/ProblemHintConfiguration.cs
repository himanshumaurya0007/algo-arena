using AlgoArena.Domain.Entities.Problems;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Problems
{
    public sealed class ProblemHintConfiguration : AuditableEntityConfiguration<ProblemHint>
    {
        public override void Configure(EntityTypeBuilder<ProblemHint> builder)
        {
            base.Configure(builder);

            builder.ToTable("ProblemHints");

            builder.Property(x => x.Hint)
                .IsRequired();

            builder.HasOne(x => x.Problem)
                .WithMany(x => x.ProblemHints)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}