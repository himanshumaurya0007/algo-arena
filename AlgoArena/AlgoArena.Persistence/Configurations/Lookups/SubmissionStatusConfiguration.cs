using AlgoArena.Domain.Entities.Lookups;
using AlgoArena.Persistence.Configurations.Common;
using AlgoArena.Persistence.Seeds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Lookups
{
    public sealed class SubmissionStatusConfiguration : LookupEntityConfiguration<SubmissionStatus>
    {
        public override void Configure(EntityTypeBuilder<SubmissionStatus> builder)
        {
            base.Configure(builder);

            builder.ToTable("SubmissionStatuses");

            builder.HasMany(x => x.Submissions)
                   .WithOne(x => x.SubmissionStatus)
                   .HasForeignKey(x => x.SubmissionStatusId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(x => x.Name)
                   .IsUnique();

            // Seed Data
            builder.HasData(SubmissionStatusSeed.Data);
        }
    }
}
