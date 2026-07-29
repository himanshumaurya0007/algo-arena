using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Persistence.Seeds
{
    public static class AccountStatusSeed
    {
        public static readonly Guid ActiveId = Guid.Parse("33333333-3333-3333-3333-333333333333");

        public static readonly Guid SuspendedId = Guid.Parse("44444444-4444-4444-4444-444444444444");

        public static readonly Guid DeletedId = Guid.Parse("55555555-5555-5555-5555-555555555555");

        public static IEnumerable<AccountStatus> Data =>
        [
            new()
            {
                Id = ActiveId,
                Name = "Active",
                DisplayOrder = 1,
                IsActive = true
            },
            new()
            {
                Id = SuspendedId,
                Name = "Suspended",
                DisplayOrder = 2,
                IsActive = true
            },
            new()
            {
                Id = DeletedId,
                Name = "Deleted",
                DisplayOrder = 3,
                IsActive = true
            }
        ];
    }
}