using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MaratonApi.Migrations
{
    /// <inheritdoc />
    public partial class GenerosFavoritos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MiembroGeneros",
                columns: table => new
                {
                    MiembroId = table.Column<int>(type: "int", nullable: false),
                    GeneroId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MiembroGeneros", x => new { x.MiembroId, x.GeneroId });
                    table.ForeignKey(
                        name: "FK_MiembroGeneros_Generos_GeneroId",
                        column: x => x.GeneroId,
                        principalTable: "Generos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MiembroGeneros_Miembros_MiembroId",
                        column: x => x.MiembroId,
                        principalTable: "Miembros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "MiembroGeneros",
                columns: new[] { "GeneroId", "MiembroId" },
                values: new object[,]
                {
                    { 3, 1 },
                    { 5, 1 },
                    { 2, 2 },
                    { 1, 3 },
                    { 4, 3 },
                    { 1, 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_MiembroGeneros_GeneroId",
                table: "MiembroGeneros",
                column: "GeneroId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MiembroGeneros");
        }
    }
}
