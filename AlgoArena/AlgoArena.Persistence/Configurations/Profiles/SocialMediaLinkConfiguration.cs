using AlgoArena.Domain.Entities.Profiles;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Profiles
{
    /// <summary>
    /// Configures the SocialMediaLink entity.
    /// </summary>
    public sealed class SocialMediaLinkConfiguration : AuditableEntityConfiguration<SocialMediaLink>
    {
        public override void Configure(EntityTypeBuilder<SocialMediaLink> builder)
        {
            base.Configure(builder);

            builder.ToTable("SocialMediaLinks");

            builder.Property(x => x.GitHubUrl)
                .HasMaxLength(500);

            builder.Property(x => x.LinkedInUrl)
                .HasMaxLength(500);

            builder.Property(x => x.PortfolioUrl)
                .HasMaxLength(500);

            builder.Property(x => x.LeetCodeUrl)
                .HasMaxLength(500);

            builder.HasOne(x => x.User)
                .WithOne(x => x.SocialMediaLink)
                .HasForeignKey<SocialMediaLink>(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}