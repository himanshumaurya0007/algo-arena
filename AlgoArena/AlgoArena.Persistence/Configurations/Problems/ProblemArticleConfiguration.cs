using AlgoArena.Domain.Entities.Problems;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Problems
{
    public sealed class ProblemArticleConfiguration : AuditableEntityConfiguration<ProblemArticle>
    {
        public override void Configure(EntityTypeBuilder<ProblemArticle> builder)
        {
            base.Configure(builder);

            builder.ToTable("ProblemArticles");

            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(250);

            builder.Property(x => x.MarkdownContent)
                .IsRequired();

            builder.HasOne(x => x.Problem)
                .WithMany(x => x.ProblemArticles)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}