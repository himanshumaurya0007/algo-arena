using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Persistence.Seeds
{
    public static class ProblemArticleSeed
    {
        public static IEnumerable<ProblemArticle> Data =>
        [
            new()
            {
                Id = Guid.Parse("A1111111-1111-1111-1111-111111111111"),
                ProblemId = ProblemSeed.TargetStrikeId,
                Title = "Using Hash Tables for Pair Sum Problems",
                MarkdownContent = "A hash table helps track numbers already seen while scanning the array once. For each value, check whether target minus value exists in the table.",
                IsPrimary = true
            },
            new()
            {
                Id = Guid.Parse("A2222222-2222-2222-2222-222222222221"),
                ProblemId = ProblemSeed.LongestCleanSegmentId,
                Title = "Sliding Window Without Repeating Characters",
                MarkdownContent = "Maintain a moving window and a map of last seen positions. When a duplicate appears, move the left boundary forward.",
                IsPrimary = true
            },
            new()
            {
                Id = Guid.Parse("A3333333-3333-3333-3333-333333333331"),
                ProblemId = ProblemSeed.WaterWallCollectorId,
                Title = "Two Pointer Approach for Trapping Water",
                MarkdownContent = "Track the maximum wall seen from both sides. Move the pointer with the smaller wall and accumulate trapped water.",
                IsPrimary = true
            }
        ];
    }
}