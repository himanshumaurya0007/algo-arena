using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Persistence.Seeds
{
    public static class ProblemSeed
    {
        public static readonly Guid TargetStrikeId =
            Guid.Parse("DDDDDDDD-DDDD-DDDD-DDDD-DDDDDDDDDDD1");

        public static readonly Guid LongestCleanSegmentId =
            Guid.Parse("DDDDDDDD-DDDD-DDDD-DDDD-DDDDDDDDDDD2");

        public static readonly Guid WaterWallCollectorId =
            Guid.Parse("DDDDDDDD-DDDD-DDDD-DDDD-DDDDDDDDDDD3");

        public static IEnumerable<Problem> Data =>
        [
            new()
            {
                Id = TargetStrikeId,
                ProgrammingDomainId = Guid.Parse("AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAA1"),
                DifficultyLevelId = Guid.Parse("99999999-9999-9999-9999-999999999991"),
                Title = "Target Strike",
                Slug = "target-strike",
                Description = "Given an array of integers and a target value, return the indices of two different numbers whose sum is equal to the target. You may assume that exactly one valid answer exists.",
                Constraints = "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
                TimeLimitInMilliseconds = 1000,
                MemoryLimitInMegabytes = 256,
                IsPublished = true,
                SolvedCount = 0,
                AttemptCount = 0
            },
            new()
            {
                Id = LongestCleanSegmentId,
                ProgrammingDomainId = Guid.Parse("AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAA2"),
                DifficultyLevelId = Guid.Parse("99999999-9999-9999-9999-999999999992"),
                Title = "Longest Clean Segment",
                Slug = "longest-clean-segment",
                Description = "Given a string, find the length of the longest contiguous segment that contains no repeated characters.",
                Constraints = "0 <= s.length <= 10^5\ns may contain letters, digits, symbols, and spaces.",
                TimeLimitInMilliseconds = 1000,
                MemoryLimitInMegabytes = 256,
                IsPublished = true,
                SolvedCount = 0,
                AttemptCount = 0
            },
            new()
            {
                Id = WaterWallCollectorId,
                ProgrammingDomainId = Guid.Parse("AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAA1"),
                DifficultyLevelId = Guid.Parse("99999999-9999-9999-9999-999999999993"),
                Title = "Water Wall Collector",
                Slug = "water-wall-collector",
                Description = "Given an array of non-negative integers representing wall heights, calculate how much water can be trapped after raining.",
                Constraints = "1 <= heights.length <= 2 * 10^4\n0 <= heights[i] <= 10^5",
                TimeLimitInMilliseconds = 1000,
                MemoryLimitInMegabytes = 256,
                IsPublished = true,
                SolvedCount = 0,
                AttemptCount = 0
            }
        ];
    }
}