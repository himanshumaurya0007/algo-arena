using AlgoArena.Domain.Entities.Profiles;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Profiles
{
    /// <summary>
    /// Configures the UserProfile entity.
    /// </summary>
    public sealed class UserProfileConfiguration : AuditableEntityConfiguration<UserProfile>
    {
        public override void Configure(EntityTypeBuilder<UserProfile> builder)
        {
            base.Configure(builder);

            builder.ToTable("UserProfiles");

            builder.Property(x => x.FirstName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.MiddleName)
                .HasMaxLength(100);

            builder.Property(x => x.LastName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.ProfilePictureUrl)
                .HasMaxLength(500);

            builder.Property(x => x.CountryCode)
                .HasMaxLength(10);

            builder.Property(x => x.PhoneNumber)
                .HasMaxLength(20);

            builder.Property(x => x.Bio)
                .HasMaxLength(1000);

            builder.HasOne(x => x.User)
                .WithOne(x => x.UserProfile)
                .HasForeignKey<UserProfile>(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Gender)
                .WithMany(x => x.UserProfiles)
                .HasForeignKey(x => x.GenderId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}