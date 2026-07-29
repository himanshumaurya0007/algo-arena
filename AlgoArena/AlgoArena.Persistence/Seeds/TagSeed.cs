using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Persistence.Seeds
{
    public static class TagSeed
    {
        public static IEnumerable<Tag> Data =>
        [
            new()
            {
                Id = Guid.Parse("CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCC1"),
                Name = "Hash Table",
                DisplayOrder = 1,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCC2"),
                Name = "Binary Search",
                DisplayOrder = 2,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCC3"),
                Name = "Greedy",
                DisplayOrder = 3,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCC4"),
                Name = "Backtracking",
                DisplayOrder = 4,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCC5"),
                Name = "Recursion",
                DisplayOrder = 5,
                IsActive = true
            }
        ];
    }
}