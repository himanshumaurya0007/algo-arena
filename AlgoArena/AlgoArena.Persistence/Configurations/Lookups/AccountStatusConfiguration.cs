using AlgoArena.Domain.Entities.Lookups;
using AlgoArena.Persistence.Configurations.Common;
using AlgoArena.Persistence.Seeds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlgoArena.Persistence.Configurations.Lookups
{
    public sealed class AccountStatusConfiguration : LookupEntityConfiguration<AccountStatus>
    {
        public override void Configure(EntityTypeBuilder<AccountStatus> builder)
        {
            base.Configure(builder);

            builder.ToTable("AccountStatuses");

            builder.HasMany(x => x.Users)
                   .WithOne(x => x.AccountStatus)
                   .HasForeignKey(x => x.AccountStatusId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(x => x.Name)
                   .IsUnique();

            // Seed Data
            builder.HasData(AccountStatusSeed.Data);
        }
    }
}
