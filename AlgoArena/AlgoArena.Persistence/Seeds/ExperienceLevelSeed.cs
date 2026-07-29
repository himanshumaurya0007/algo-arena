using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Persistence.Seeds
{
    public static class ExperienceLevelSeed
    {
        public static IEnumerable<ExperienceLevel> Data =>
        [
            new()
            {
                Id = Guid.Parse("88888888-8888-8888-8888-888888888881"),
                Name = "Fresher",
                DisplayOrder = 1,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("88888888-8888-8888-8888-888888888882"),
                Name = "Junior",
                DisplayOrder = 2,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("88888888-8888-8888-8888-888888888883"),
                Name = "Mid-Level",
                DisplayOrder = 3,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("88888888-8888-8888-8888-888888888884"),
                Name = "Senior",
                DisplayOrder = 4,
                IsActive = true
            }
        ];
    }
}