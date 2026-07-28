using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Persistence.Seeds
{
    public static class ProgrammingLanguageSeed
    {
        public static IEnumerable<ProgrammingLanguage> Data =>
        [
            new()
            {
                Id = Guid.Parse("BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBB1"),
                Name = "C",
                DisplayOrder = 1,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBB2"),
                Name = "C++",
                DisplayOrder = 2,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBB3"),
                Name = "Java",
                DisplayOrder = 3,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBB4"),
                Name = "Python",
                DisplayOrder = 4,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBB5"),
                Name = "C#",
                DisplayOrder = 5,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBB6"),
                Name = "JavaScript",
                DisplayOrder = 6,
                IsActive = true
            }
        ];
    }
}