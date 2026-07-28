using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Persistence.Seeds
{
    public static class EducationLevelSeed
    {
        public static IEnumerable<EducationLevel> Data =>
        [
            new()
            {
                Id = Guid.Parse("77777777-7777-7777-7777-777777777771"),
                Name = "High School",
                DisplayOrder = 1,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("77777777-7777-7777-7777-777777777772"),
                Name = "Diploma",
                DisplayOrder = 2,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("77777777-7777-7777-7777-777777777773"),
                Name = "Bachelor's Degree",
                DisplayOrder = 3,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("77777777-7777-7777-7777-777777777774"),
                Name = "Master's Degree",
                DisplayOrder = 4,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("77777777-7777-7777-7777-777777777775"),
                Name = "Doctorate",
                DisplayOrder = 5,
                IsActive = true
            }
        ];
    }
}