using AlgoArena.Domain.Entities.Problems;

namespace AlgoArena.Persistence.Seeds
{
    public static class ProblemBoilerplateSeed
    {
        private static readonly Guid CLanguageId =
            Guid.Parse("BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBB1");

        private static readonly Guid CppLanguageId =
            Guid.Parse("BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBB2");

        private static readonly Guid JavaLanguageId =
            Guid.Parse("BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBB3");


        public static IEnumerable<ProblemBoilerplate> Data =>
            [
            new()
            {
                Id = Guid.Parse("B1111111-1111-1111-1111-111111111111"),
                ProblemId = ProblemSeed.TargetStrikeId,
                ProgrammingLanguageId = CLanguageId,
                TemplateCode = "#include <stdio.h>\n\nint main()\n{\n    // Write your solution here\n    return 0;\n}"
                },
            new()
            {
                Id = Guid.Parse("B1111111-1111-1111-1111-111111111112"),
                ProblemId = ProblemSeed.TargetStrikeId,
                ProgrammingLanguageId = CppLanguageId,
                TemplateCode = "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // Write your solution here\n  return 0;\n}"
            },
            new()
            {
                Id = Guid.Parse("B1111111-1111-1111-1111-111111111113"),
                ProblemId = ProblemSeed.TargetStrikeId,
                ProgrammingLanguageId = JavaLanguageId,
                TemplateCode = "class Solution {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}"
            },
            new()
            {
                Id = Guid.Parse("B2222222-2222-2222-2222-222222222221"),
                ProblemId = ProblemSeed.LongestCleanSegmentId,
                ProgrammingLanguageId = CLanguageId,
                TemplateCode = "#include <stdio.h>\n\nint main()\n{\n    // Write your solution here\n    return 0;\n}"
            },
            new()
            {
                Id = Guid.Parse("B2222222-2222-2222-2222-222222222222"),
                ProblemId = ProblemSeed.LongestCleanSegmentId,
                ProgrammingLanguageId = CppLanguageId,
                TemplateCode = "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // Write your solution here\n  return 0;\n}"
            },
            new()
            {
                Id = Guid.Parse("B2222222-2222-2222-2222-222222222223"),
                ProblemId = ProblemSeed.LongestCleanSegmentId,
                ProgrammingLanguageId = JavaLanguageId,
                TemplateCode = "class Solution {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}"
            },
            new()
            {
                Id = Guid.Parse("B3333333-3333-3333-3333-333333333331"),
                ProblemId = ProblemSeed.WaterWallCollectorId,
                ProgrammingLanguageId = CLanguageId,
                TemplateCode = "#include <stdio.h>\n\nint main()\n{\n    // Write your solution here\n    return 0;\n}"
            },
            new()
            {
                Id = Guid.Parse("B3333333-3333-3333-3333-333333333332"),
                ProblemId = ProblemSeed.WaterWallCollectorId,
                ProgrammingLanguageId = CppLanguageId,
                TemplateCode = "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // Write your solution here\n  return 0;\n}"
            },
            new()
            {
                Id = Guid.Parse("B3333333-3333-3333-3333-333333333333"),
                ProblemId = ProblemSeed.WaterWallCollectorId,
                ProgrammingLanguageId = JavaLanguageId,
                TemplateCode = "class Solution {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}"
            }
        ];
    }
}