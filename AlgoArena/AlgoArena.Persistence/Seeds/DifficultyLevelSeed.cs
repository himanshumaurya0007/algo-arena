using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Persistence.Seeds
{
    public static class DifficultyLevelSeed
    {
        public static IEnumerable<DifficultyLevel> Data =>
        [
            new()
            {
                Id = Guid.Parse("99999999-9999-9999-9999-999999999991"),
                Name = "Easy",
                DisplayOrder = 1,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("99999999-9999-9999-9999-999999999992"),
                Name = "Medium",
                DisplayOrder = 2,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("99999999-9999-9999-9999-999999999993"),
                Name = "Hard",
                DisplayOrder = 3,
                IsActive = true
            }
        ];
    }
}