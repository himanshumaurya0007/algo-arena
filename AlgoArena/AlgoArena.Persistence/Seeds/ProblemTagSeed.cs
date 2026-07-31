using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Persistence.Seeds
{
    public static class ProblemTagSeed
    {
        private static readonly Guid HashTableTagId =
            Guid.Parse("CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCC1");

        private static readonly Guid GreedyTagId =
            Guid.Parse("CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCC3");

        public static IEnumerable<ProblemTag> Data =>
        [
            new()
            {
                ProblemId = ProblemSeed.TargetStrikeId,
                TagId = HashTableTagId
            },
            new()
            {
                ProblemId = ProblemSeed.LongestCleanSegmentId,
                TagId = HashTableTagId
            },
            new()
            {
                ProblemId = ProblemSeed.WaterWallCollectorId,
                TagId = GreedyTagId
            }
        ];
    }
}