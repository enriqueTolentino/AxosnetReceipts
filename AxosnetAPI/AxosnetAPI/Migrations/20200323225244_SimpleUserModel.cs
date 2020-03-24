using Microsoft.EntityFrameworkCore.Migrations;

namespace AxosnetAPI.Migrations
{
    public partial class SimpleUserModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdUser",
                table: "Receipts",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    IdUser = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.IdUser);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_IdUser",
                table: "Receipts",
                column: "IdUser");

            migrationBuilder.AddForeignKey(
                name: "FK_Receipts_Users_IdUser",
                table: "Receipts",
                column: "IdUser",
                principalTable: "Users",
                principalColumn: "IdUser",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receipts_Users_IdUser",
                table: "Receipts");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Receipts_IdUser",
                table: "Receipts");

            migrationBuilder.DropColumn(
                name: "IdUser",
                table: "Receipts");
        }
    }
}
