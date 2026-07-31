using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Persistence.Seeds
{
    public static class GenderSeed
    {
        public static IEnumerable<Gender> Data =>
        [
            new()
            {
                Id = Guid.Parse("66666666-6666-6666-6666-666666666661"),
                Name = "Male",
                DisplayOrder = 1,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("66666666-6666-6666-6666-666666666662"),
                Name = "Female",
                DisplayOrder = 2,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("66666666-6666-6666-6666-666666666663"),
                Name = "Other",
                DisplayOrder = 3,
                IsActive = true
            }
        ];
    }
}