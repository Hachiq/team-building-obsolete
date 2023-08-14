using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.AppMigrations
{
    public partial class AddStat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StatId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Stats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DaysWorked = table.Column<int>(type: "int", nullable: false),
                    DaysPaid = table.Column<int>(type: "int", nullable: false),
                    Salary = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stats", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_StatId",
                table: "Users",
                column: "StatId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Stats_StatId",
                table: "Users",
                column: "StatId",
                principalTable: "Stats",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Stats_StatId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Stats");

            migrationBuilder.DropIndex(
                name: "IX_Users_StatId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "StatId",
                table: "Users");
        }
    }
}
