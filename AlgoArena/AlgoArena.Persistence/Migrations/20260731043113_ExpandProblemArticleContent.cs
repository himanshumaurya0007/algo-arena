using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlgoArena.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ExpandProblemArticleContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ProblemArticles",
                keyColumn: "Id",
                keyValue: new Guid("a1111111-1111-1111-1111-111111111111"),
                column: "MarkdownContent",
                value: "## Concept\n\nTarget Strike is based on the pair-sum pattern. The goal is to find two different numbers whose sum equals the target.\n\nA brute-force solution checks every pair, but that takes O(n^2) time. A better approach is to remember numbers we have already seen while scanning the array once.\n\n## Approach\n\nUse a hash table to store each number and its index. For every current number, calculate the required partner value:\n\nrequired = target - currentNumber\n\nIf required already exists in the hash table, we have found the answer. Otherwise, store the current number with its index and continue.\n\n## Step-by-step\n\n1. Create an empty hash table.\n2. Traverse the array from left to right.\n3. For each number, calculate target minus current number.\n4. If that required number exists in the hash table, return both indices.\n5. Otherwise, store the current number and its index.\n\n## Complexity\n\nTime Complexity: O(n), because each element is processed once.\n\nSpace Complexity: O(n), because the hash table can store up to n elements.\n\n## Common Mistakes\n\nDo not use the same element twice. Always check for the required number before inserting the current number into the hash table.\n\nAlso be careful when duplicate numbers exist. Store indices, not just values.");

            migrationBuilder.UpdateData(
                table: "ProblemArticles",
                keyColumn: "Id",
                keyValue: new Guid("a2222222-2222-2222-2222-222222222221"),
                column: "MarkdownContent",
                value: "## Concept\n\nLongest Clean Segment is based on the sliding window technique. We need the longest contiguous part of a string where no character appears more than once.\n\nThe key idea is to maintain a window with unique characters. When a repeated character appears, move the left boundary forward until the window becomes valid again.\n\n## Approach\n\nUse two pointers: left and right. The right pointer expands the window by reading characters one by one. A hash map stores the latest index where each character was seen.\n\nIf the current character was already seen inside the current window, move left to one position after the previous occurrence.\n\n## Step-by-step\n\n1. Set left to 0.\n2. Traverse the string with right.\n3. Store the latest position of each character.\n4. If a duplicate is found inside the current window, move left forward.\n5. After every step, update the maximum window length.\n\n## Complexity\n\nTime Complexity: O(n), because each character is processed at most a small constant number of times.\n\nSpace Complexity: O(k), where k is the number of unique characters stored in the map.\n\n## Common Mistakes\n\nDo not move left backward. When updating left, use the maximum of current left and previousIndex + 1.\n\nAlso remember that the answer is length, not the substring itself, unless the problem specifically asks for the substring.");

            migrationBuilder.UpdateData(
                table: "ProblemArticles",
                keyColumn: "Id",
                keyValue: new Guid("a3333333-3333-3333-3333-333333333331"),
                column: "MarkdownContent",
                value: "## Concept\n\nWater Wall Collector is based on the trapping rain water pattern. Each value represents a wall height. Water can be stored above a position only if there is a taller boundary on both left and right sides.\n\nA direct solution checks the maximum wall on both sides for every index, but that can be inefficient. The two-pointer approach solves it in one pass.\n\n## Approach\n\nUse two pointers, left and right, starting from both ends of the array. Track the maximum wall seen so far from the left side and from the right side.\n\nAt each step, move the pointer with the smaller height. This works because the smaller side determines the amount of water that can be trapped at that point.\n\n## Step-by-step\n\n1. Start left at the beginning and right at the end.\n2. Track leftMax and rightMax.\n3. If height[left] is smaller, update leftMax or add trapped water at left.\n4. Otherwise, update rightMax or add trapped water at right.\n5. Continue until both pointers meet.\n\n## Complexity\n\nTime Complexity: O(n), because each index is visited once.\n\nSpace Complexity: O(1), because only a few variables are used.\n\n## Common Mistakes\n\nDo not calculate water using only the nearest wall. The trapped water depends on the maximum boundary on both sides.\n\nAlso make sure trapped water is never negative. Add water only when the current wall is lower than the tracked maximum.");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ProblemArticles",
                keyColumn: "Id",
                keyValue: new Guid("a1111111-1111-1111-1111-111111111111"),
                column: "MarkdownContent",
                value: "A hash table helps track numbers already seen while scanning the array once. For each value, check whether target minus value exists in the table.");

            migrationBuilder.UpdateData(
                table: "ProblemArticles",
                keyColumn: "Id",
                keyValue: new Guid("a2222222-2222-2222-2222-222222222221"),
                column: "MarkdownContent",
                value: "Maintain a moving window and a map of last seen positions. When a duplicate appears, move the left boundary forward.");

            migrationBuilder.UpdateData(
                table: "ProblemArticles",
                keyColumn: "Id",
                keyValue: new Guid("a3333333-3333-3333-3333-333333333331"),
                column: "MarkdownContent",
                value: "Track the maximum wall seen from both sides. Move the pointer with the smaller wall and accumulate trapped water.");
        }
    }
}
