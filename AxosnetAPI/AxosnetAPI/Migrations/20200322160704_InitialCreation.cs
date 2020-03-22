using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AxosnetAPI.Migrations
{
    public partial class InitialCreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Currencies",
                columns: table => new
                {
                    IdCurrency = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currencies", x => x.IdCurrency);
                });

            migrationBuilder.CreateTable(
                name: "Receipts",
                columns: table => new
                {
                    IdReceipt = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProviderCode = table.Column<string>(maxLength: 10, nullable: false),
                    Amount = table.Column<decimal>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Comments = table.Column<string>(maxLength: 500, nullable: true),
                    IdCurrency = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Receipts", x => x.IdReceipt);
                    table.ForeignKey(
                        name: "FK_Receipts_Currencies_IdCurrency",
                        column: x => x.IdCurrency,
                        principalTable: "Currencies",
                        principalColumn: "IdCurrency",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_IdCurrency",
                table: "Receipts",
                column: "IdCurrency");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Receipts");

            migrationBuilder.DropTable(
                name: "Currencies");
        }
    }
}
