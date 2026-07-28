using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Persistence.Seeds
{
    public static class RoleSeed
    {
        public static readonly Guid AdminId = Guid.Parse("11111111-1111-1111-1111-111111111111");

        public static readonly Guid UserId = Guid.Parse("22222222-2222-2222-2222-222222222222");

        public static IEnumerable<Role> Data =>
        [
            new Role
            {
                Id = AdminId,
                Name = "Admin",
                DisplayOrder = 1,
                IsActive = true
            },
            new Role
            {
                Id = UserId,
                Name = "User",
                DisplayOrder = 2,
                IsActive = true
            }
        ];
    }
}