using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Persistence.Seeds
{
    public static class ProblemExampleSeed
    {
        public static IEnumerable<ProblemExample> Data =>
        [
            new()
            {
                Id = Guid.Parse("EEEEEEEE-EEEE-EEEE-EEEE-EEEEEEEEEEE1"),
                ProblemId = ProblemSeed.TargetStrikeId,
                DisplayOrder = 1,
                ImageUrl = null,
                Input = "nums = [2, 7, 11, 15], target = 9",
                Output = "[0, 1]",
                Explanation = "nums[0] + nums[1] equals 9, so the answer is [0, 1]."
            },
            new()
            {
                Id = Guid.Parse("EEEEEEEE-EEEE-EEEE-EEEE-EEEEEEEEEEE2"),
                ProblemId = ProblemSeed.LongestCleanSegmentId,
                DisplayOrder = 1,
                ImageUrl = null,
                Input = "s = \"abcabcbb\"",
                Output = "3",
                Explanation = "The longest segment without repeating characters is \"abc\"."
            },
            new()
            {
                Id = Guid.Parse("EEEEEEEE-EEEE-EEEE-EEEE-EEEEEEEEEEE3"),
                ProblemId = ProblemSeed.WaterWallCollectorId,
                DisplayOrder = 1,
                ImageUrl = null,
                Input = "heights = [0,1,0,2,1,0,1,3,2,1,2,1]",
                Output = "6",
                Explanation = "The bars can trap 6 units of water in total."
            }
        ];
    }
}