using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Persistence.Seeds
{
    public static class ProblemVideoSeed
    {
        public static IEnumerable<ProblemVideo> Data =>
        [
            new()
            {
                Id = Guid.Parse("A9111111-1111-1111-1111-111111111111"),
                ProblemId = ProblemSeed.TargetStrikeId,
                Title = "Pair Sum Using Hash Map",
                VideoUrl = "https://www.youtube.com/embed/KLlXCFG5TnA",
                DisplayOrder = 1,
                IsPrimary = true
            },
            new()
            {
                Id = Guid.Parse("A9222222-2222-2222-2222-222222222221"),
                ProblemId = ProblemSeed.LongestCleanSegmentId,
                Title = "Longest Substring Sliding Window",
                VideoUrl = "https://www.youtube.com/embed/wiGpQwVHdE0",
                DisplayOrder = 1,
                IsPrimary = true
            },
            new()
            {
                Id = Guid.Parse("A9333333-3333-3333-3333-333333333331"),
                ProblemId = ProblemSeed.WaterWallCollectorId,
                Title = "Trapping Rain Water Two Pointers",
                VideoUrl = "https://www.youtube.com/embed/ZI2z5pq0TqA",
                DisplayOrder = 1,
                IsPrimary = true
            }
        ];
    }
}