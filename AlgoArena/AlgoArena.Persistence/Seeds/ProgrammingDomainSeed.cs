using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Persistence.Seeds
{
    public static class ProgrammingDomainSeed
    {
        public static IEnumerable<ProgrammingDomain> Data =>
        [
            new()
            {
                Id = Guid.Parse("AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAA1"),
                Name = "Arrays",
                DisplayOrder = 1,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAA2"),
                Name = "Strings",
                DisplayOrder = 2,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAA3"),
                Name = "Linked List",
                DisplayOrder = 3,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAA4"),
                Name = "Trees",
                DisplayOrder = 4,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAA5"),
                Name = "Graphs",
                DisplayOrder = 5,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAA6"),
                Name = "Dynamic Programming",
                DisplayOrder = 6,
                IsActive = true
            }
        ];
    }
}