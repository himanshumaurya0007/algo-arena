using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AlgoArena.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialProblems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Problems",
                columns: new[] { "Id", "AttemptCount", "Constraints", "CreatedAt", "CreatedBy", "DeletedAt", "DeletedBy", "Description", "DifficultyLevelId", "IsPublished", "MemoryLimitInMegabytes", "ProgrammingDomainId", "Slug", "SolvedCount", "TimeLimitInMilliseconds", "Title", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"), 0, "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, "Given an array of integers and a target value, return the indices of two different numbers whose sum is equal to the target. You may assume that exactly one valid answer exists.", new Guid("99999999-9999-9999-9999-999999999991"), true, 256, new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1"), "target-strike", 0, 1000, "Target Strike", null, null },
                    { new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd2"), 0, "0 <= s.length <= 10^5\ns may contain letters, digits, symbols, and spaces.", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, "Given a string, find the length of the longest contiguous segment that contains no repeated characters.", new Guid("99999999-9999-9999-9999-999999999992"), true, 256, new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2"), "longest-clean-segment", 0, 1000, "Longest Clean Segment", null, null },
                    { new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd3"), 0, "1 <= heights.length <= 2 * 10^4\n0 <= heights[i] <= 10^5", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, "Given an array of non-negative integers representing wall heights, calculate how much water can be trapped after raining.", new Guid("99999999-9999-9999-9999-999999999993"), true, 256, new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1"), "water-wall-collector", 0, 1000, "Water Wall Collector", null, null }
                });

            migrationBuilder.InsertData(
                table: "ProblemArticles",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "DeletedAt", "DeletedBy", "IsPrimary", "MarkdownContent", "ProblemId", "Title", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("a1111111-1111-1111-1111-111111111111"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, true, "A hash table helps track numbers already seen while scanning the array once. For each value, check whether target minus value exists in the table.", new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"), "Using Hash Tables for Pair Sum Problems", null, null },
                    { new Guid("a2222222-2222-2222-2222-222222222221"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, true, "Maintain a moving window and a map of last seen positions. When a duplicate appears, move the left boundary forward.", new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd2"), "Sliding Window Without Repeating Characters", null, null },
                    { new Guid("a3333333-3333-3333-3333-333333333331"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, true, "Track the maximum wall seen from both sides. Move the pointer with the smaller wall and accumulate trapped water.", new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd3"), "Two Pointer Approach for Trapping Water", null, null }
                });

            migrationBuilder.InsertData(
                table: "ProblemBoilerplates",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "DeletedAt", "DeletedBy", "ProblemId", "ProgrammingLanguageId", "TemplateCode", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("b1111111-1111-1111-1111-111111111111"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"), new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb6"), "function solve(input) {\n  // Write your solution here\n}", null, null },
                    { new Guid("b1111111-1111-1111-1111-111111111112"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"), new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3"), "class Solution {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}", null, null },
                    { new Guid("b1111111-1111-1111-1111-111111111113"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"), new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"), "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // Write your solution here\n  return 0;\n}", null, null },
                    { new Guid("b1111111-1111-1111-1111-111111111114"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"), new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb4"), "def solve():\n    # Write your solution here\n    pass\n\nsolve()", null, null },
                    { new Guid("b2222222-2222-2222-2222-222222222221"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd2"), new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb6"), "function solve(input) {\n  // Write your solution here\n}", null, null },
                    { new Guid("b3333333-3333-3333-3333-333333333331"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd3"), new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb6"), "function solve(input) {\n  // Write your solution here\n}", null, null }
                });

            migrationBuilder.InsertData(
                table: "ProblemExamples",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "DeletedAt", "DeletedBy", "DisplayOrder", "Explanation", "ImageUrl", "Input", "Output", "ProblemId", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, (byte)1, "nums[0] + nums[1] equals 9, so the answer is [0, 1].", null, "nums = [2, 7, 11, 15], target = 9", "[0, 1]", new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"), null, null },
                    { new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee2"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, (byte)1, "The longest segment without repeating characters is \"abc\".", null, "s = \"abcabcbb\"", "3", new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd2"), null, null },
                    { new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee3"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, (byte)1, "The bars can trap 6 units of water in total.", null, "heights = [0,1,0,2,1,0,1,3,2,1,2,1]", "6", new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd3"), null, null }
                });

            migrationBuilder.InsertData(
                table: "ProblemTags",
                columns: new[] { "ProblemId", "TagId" },
                values: new object[,]
                {
                    { new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"), new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc1") },
                    { new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd2"), new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc1") },
                    { new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd3"), new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc3") }
                });

            migrationBuilder.InsertData(
                table: "ProblemTestCases",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "DeletedAt", "DeletedBy", "DisplayOrder", "ExpectedOutput", "Input", "IsHidden", "ProblemId", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("f1111111-1111-1111-1111-111111111111"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, (short)1, "[0, 1]", "[2, 7, 11, 15]\n9", false, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"), null, null },
                    { new Guid("f1111111-1111-1111-1111-111111111112"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, (short)2, "[1, 2]", "[3, 2, 4]\n6", true, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"), null, null },
                    { new Guid("f2222222-2222-2222-2222-222222222221"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, (short)1, "3", "abcabcbb", false, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd2"), null, null },
                    { new Guid("f2222222-2222-2222-2222-222222222222"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, (short)2, "1", "bbbbb", true, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd2"), null, null },
                    { new Guid("f3333333-3333-3333-3333-333333333331"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, (short)1, "6", "[0,1,0,2,1,0,1,3,2,1,2,1]", false, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd3"), null, null },
                    { new Guid("f3333333-3333-3333-3333-333333333332"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, (short)2, "9", "[4,2,0,3,2,5]", true, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd3"), null, null }
                });

            migrationBuilder.InsertData(
                table: "ProblemVideos",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "DeletedAt", "DeletedBy", "DisplayOrder", "IsPrimary", "ProblemId", "Title", "UpdatedAt", "UpdatedBy", "VideoUrl" },
                values: new object[,]
                {
                    { new Guid("a9111111-1111-1111-1111-111111111111"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, (byte)1, true, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"), "Pair Sum Using Hash Map", null, null, "https://www.youtube.com/embed/KLlXCFG5TnA" },
                    { new Guid("a9222222-2222-2222-2222-222222222221"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, (byte)1, true, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd2"), "Longest Substring Sliding Window", null, null, "https://www.youtube.com/embed/wiGpQwVHdE0" },
                    { new Guid("a9333333-3333-3333-3333-333333333331"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, (byte)1, true, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd3"), "Trapping Rain Water Two Pointers", null, null, "https://www.youtube.com/embed/ZI2z5pq0TqA" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ProblemArticles",
                keyColumn: "Id",
                keyValue: new Guid("a1111111-1111-1111-1111-111111111111"));

            migrationBuilder.DeleteData(
                table: "ProblemArticles",
                keyColumn: "Id",
                keyValue: new Guid("a2222222-2222-2222-2222-222222222221"));

            migrationBuilder.DeleteData(
                table: "ProblemArticles",
                keyColumn: "Id",
                keyValue: new Guid("a3333333-3333-3333-3333-333333333331"));

            migrationBuilder.DeleteData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b1111111-1111-1111-1111-111111111111"));

            migrationBuilder.DeleteData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b1111111-1111-1111-1111-111111111112"));

            migrationBuilder.DeleteData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b1111111-1111-1111-1111-111111111113"));

            migrationBuilder.DeleteData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b1111111-1111-1111-1111-111111111114"));

            migrationBuilder.DeleteData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b2222222-2222-2222-2222-222222222221"));

            migrationBuilder.DeleteData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b3333333-3333-3333-3333-333333333331"));

            migrationBuilder.DeleteData(
                table: "ProblemExamples",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1"));

            migrationBuilder.DeleteData(
                table: "ProblemExamples",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee2"));

            migrationBuilder.DeleteData(
                table: "ProblemExamples",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee3"));

            migrationBuilder.DeleteData(
                table: "ProblemTags",
                keyColumns: new[] { "ProblemId", "TagId" },
                keyValues: new object[] { new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"), new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc1") });

            migrationBuilder.DeleteData(
                table: "ProblemTags",
                keyColumns: new[] { "ProblemId", "TagId" },
                keyValues: new object[] { new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd2"), new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc1") });

            migrationBuilder.DeleteData(
                table: "ProblemTags",
                keyColumns: new[] { "ProblemId", "TagId" },
                keyValues: new object[] { new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd3"), new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc3") });

            migrationBuilder.DeleteData(
                table: "ProblemTestCases",
                keyColumn: "Id",
                keyValue: new Guid("f1111111-1111-1111-1111-111111111111"));

            migrationBuilder.DeleteData(
                table: "ProblemTestCases",
                keyColumn: "Id",
                keyValue: new Guid("f1111111-1111-1111-1111-111111111112"));

            migrationBuilder.DeleteData(
                table: "ProblemTestCases",
                keyColumn: "Id",
                keyValue: new Guid("f2222222-2222-2222-2222-222222222221"));

            migrationBuilder.DeleteData(
                table: "ProblemTestCases",
                keyColumn: "Id",
                keyValue: new Guid("f2222222-2222-2222-2222-222222222222"));

            migrationBuilder.DeleteData(
                table: "ProblemTestCases",
                keyColumn: "Id",
                keyValue: new Guid("f3333333-3333-3333-3333-333333333331"));

            migrationBuilder.DeleteData(
                table: "ProblemTestCases",
                keyColumn: "Id",
                keyValue: new Guid("f3333333-3333-3333-3333-333333333332"));

            migrationBuilder.DeleteData(
                table: "ProblemVideos",
                keyColumn: "Id",
                keyValue: new Guid("a9111111-1111-1111-1111-111111111111"));

            migrationBuilder.DeleteData(
                table: "ProblemVideos",
                keyColumn: "Id",
                keyValue: new Guid("a9222222-2222-2222-2222-222222222221"));

            migrationBuilder.DeleteData(
                table: "ProblemVideos",
                keyColumn: "Id",
                keyValue: new Guid("a9333333-3333-3333-3333-333333333331"));

            migrationBuilder.DeleteData(
                table: "Problems",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"));

            migrationBuilder.DeleteData(
                table: "Problems",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd2"));

            migrationBuilder.DeleteData(
                table: "Problems",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd3"));
        }
    }
}
