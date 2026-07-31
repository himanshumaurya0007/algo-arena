using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Persistence.Seeds
{
    public static class ProblemTestCaseSeed
    {
        public static IEnumerable<ProblemTestCase> Data =>
        [
            new()
            {
                Id = Guid.Parse("F1111111-1111-1111-1111-111111111111"),
                ProblemId = ProblemSeed.TargetStrikeId,
                DisplayOrder = 1,
                Input = "[2, 7, 11, 15]\n9",
                ExpectedOutput = "[0, 1]",
                IsHidden = false
            },
            new()
            {
                Id = Guid.Parse("F1111111-1111-1111-1111-111111111112"),
                ProblemId = ProblemSeed.TargetStrikeId,
                DisplayOrder = 2,
                Input = "[3, 2, 4]\n6",
                ExpectedOutput = "[1, 2]",
                IsHidden = true
            },
            new()
            {
                Id = Guid.Parse("F2222222-2222-2222-2222-222222222221"),
                ProblemId = ProblemSeed.LongestCleanSegmentId,
                DisplayOrder = 1,
                Input = "abcabcbb",
                ExpectedOutput = "3",
                IsHidden = false
            },
            new()
            {
                Id = Guid.Parse("F2222222-2222-2222-2222-222222222222"),
                ProblemId = ProblemSeed.LongestCleanSegmentId,
                DisplayOrder = 2,
                Input = "bbbbb",
                ExpectedOutput = "1",
                IsHidden = true
            },
            new()
            {
                Id = Guid.Parse("F3333333-3333-3333-3333-333333333331"),
                ProblemId = ProblemSeed.WaterWallCollectorId,
                DisplayOrder = 1,
                Input = "[0,1,0,2,1,0,1,3,2,1,2,1]",
                ExpectedOutput = "6",
                IsHidden = false
            },
            new()
            {
                Id = Guid.Parse("F3333333-3333-3333-3333-333333333332"),
                ProblemId = ProblemSeed.WaterWallCollectorId,
                DisplayOrder = 2,
                Input = "[4,2,0,3,2,5]",
                ExpectedOutput = "9",
                IsHidden = true
            }
        ];
    }
}