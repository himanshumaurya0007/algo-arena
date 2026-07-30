using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AlgoArena.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RestrictProblemBoilerplatesToSupportedLanguages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b1111111-1111-1111-1111-111111111114"));

            migrationBuilder.UpdateData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b1111111-1111-1111-1111-111111111111"),
                columns: new[] { "ProgrammingLanguageId", "TemplateCode" },
                values: new object[] { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1"), "#include <stdio.h>\n\nint main()\n{\n    // Write your solution here\n    return 0;\n}" });

            migrationBuilder.UpdateData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b1111111-1111-1111-1111-111111111112"),
                columns: new[] { "ProgrammingLanguageId", "TemplateCode" },
                values: new object[] { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"), "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // Write your solution here\n  return 0;\n}" });

            migrationBuilder.UpdateData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b1111111-1111-1111-1111-111111111113"),
                columns: new[] { "ProgrammingLanguageId", "TemplateCode" },
                values: new object[] { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3"), "class Solution {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}" });

            migrationBuilder.UpdateData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b2222222-2222-2222-2222-222222222221"),
                columns: new[] { "ProgrammingLanguageId", "TemplateCode" },
                values: new object[] { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1"), "#include <stdio.h>\n\nint main()\n{\n    // Write your solution here\n    return 0;\n}" });

            migrationBuilder.UpdateData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b3333333-3333-3333-3333-333333333331"),
                columns: new[] { "ProgrammingLanguageId", "TemplateCode" },
                values: new object[] { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1"), "#include <stdio.h>\n\nint main()\n{\n    // Write your solution here\n    return 0;\n}" });

            migrationBuilder.InsertData(
                table: "ProblemBoilerplates",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "DeletedAt", "DeletedBy", "ProblemId", "ProgrammingLanguageId", "TemplateCode", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("b2222222-2222-2222-2222-222222222222"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd2"), new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"), "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // Write your solution here\n  return 0;\n}", null, null },
                    { new Guid("b2222222-2222-2222-2222-222222222223"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd2"), new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3"), "class Solution {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}", null, null },
                    { new Guid("b3333333-3333-3333-3333-333333333332"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd3"), new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"), "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // Write your solution here\n  return 0;\n}", null, null },
                    { new Guid("b3333333-3333-3333-3333-333333333333"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd3"), new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3"), "class Solution {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}", null, null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b2222222-2222-2222-2222-222222222222"));

            migrationBuilder.DeleteData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b2222222-2222-2222-2222-222222222223"));

            migrationBuilder.DeleteData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b3333333-3333-3333-3333-333333333332"));

            migrationBuilder.DeleteData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b3333333-3333-3333-3333-333333333333"));

            migrationBuilder.UpdateData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b1111111-1111-1111-1111-111111111111"),
                columns: new[] { "ProgrammingLanguageId", "TemplateCode" },
                values: new object[] { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb6"), "function solve(input) {\n  // Write your solution here\n}" });

            migrationBuilder.UpdateData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b1111111-1111-1111-1111-111111111112"),
                columns: new[] { "ProgrammingLanguageId", "TemplateCode" },
                values: new object[] { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3"), "class Solution {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}" });

            migrationBuilder.UpdateData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b1111111-1111-1111-1111-111111111113"),
                columns: new[] { "ProgrammingLanguageId", "TemplateCode" },
                values: new object[] { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"), "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // Write your solution here\n  return 0;\n}" });

            migrationBuilder.UpdateData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b2222222-2222-2222-2222-222222222221"),
                columns: new[] { "ProgrammingLanguageId", "TemplateCode" },
                values: new object[] { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb6"), "function solve(input) {\n  // Write your solution here\n}" });

            migrationBuilder.UpdateData(
                table: "ProblemBoilerplates",
                keyColumn: "Id",
                keyValue: new Guid("b3333333-3333-3333-3333-333333333331"),
                columns: new[] { "ProgrammingLanguageId", "TemplateCode" },
                values: new object[] { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb6"), "function solve(input) {\n  // Write your solution here\n}" });

            migrationBuilder.InsertData(
                table: "ProblemBoilerplates",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "DeletedAt", "DeletedBy", "ProblemId", "ProgrammingLanguageId", "TemplateCode", "UpdatedAt", "UpdatedBy" },
                values: new object[] { new Guid("b1111111-1111-1111-1111-111111111114"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd1"), new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb4"), "def solve():\n    # Write your solution here\n    pass\n\nsolve()", null, null });
        }
    }
}
