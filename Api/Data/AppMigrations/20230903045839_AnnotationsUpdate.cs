using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.AppMigrations
{
    public partial class AnnotationsUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Stats_StatId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "StatId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Stats_StatId",
                table: "Users",
                column: "StatId",
                principalTable: "Stats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Stats_StatId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "StatId",
                table: "Users",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Stats_StatId",
                table: "Users",
                column: "StatId",
                principalTable: "Stats",
                principalColumn: "Id");
        }
    }
}
