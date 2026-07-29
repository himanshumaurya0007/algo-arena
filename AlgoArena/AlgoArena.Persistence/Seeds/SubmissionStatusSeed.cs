using AlgoArena.Domain.Entities.Lookups;

namespace AlgoArena.Persistence.Seeds
{
    public static class SubmissionStatusSeed
    {
        public static IEnumerable<SubmissionStatus> Data =>
        [
            new()
            {
                Id = Guid.Parse("DDDDDDDD-DDDD-DDDD-DDDD-DDDDDDDDDDD1"),
                Name = "Accepted",
                DisplayOrder = 1,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("DDDDDDDD-DDDD-DDDD-DDDD-DDDDDDDDDDD2"),
                Name = "Wrong Answer",
                DisplayOrder = 2,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("DDDDDDDD-DDDD-DDDD-DDDD-DDDDDDDDDDD3"),
                Name = "Time Limit Exceeded",
                DisplayOrder = 3,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("DDDDDDDD-DDDD-DDDD-DDDD-DDDDDDDDDDD4"),
                Name = "Runtime Error",
                DisplayOrder = 4,
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("DDDDDDDD-DDDD-DDDD-DDDD-DDDDDDDDDDD5"),
                Name = "Compilation Error",
                DisplayOrder = 5,
                IsActive = true
            }
        ];
    }
}