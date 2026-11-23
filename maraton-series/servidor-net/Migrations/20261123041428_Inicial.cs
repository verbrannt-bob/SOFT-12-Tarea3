using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MaratonApi.Migrations
{
    /// <inheritdoc />
    public partial class Inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Generos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Generos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Miembros",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Correo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Registro = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Miembros", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Series",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titulo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Temporadas = table.Column<int>(type: "int", nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    GeneroId = table.Column<int>(type: "int", nullable: false),
                    MiembroId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Series", x => x.Id);
                    table.CheckConstraint("CK_Series_Estado", "[Estado] IN (N'Por ver', N'Viendo', N'Vista')");
                    table.CheckConstraint("CK_Series_Temporadas", "[Temporadas] BETWEEN 1 AND 30");
                    table.ForeignKey(
                        name: "FK_Series_Generos_GeneroId",
                        column: x => x.GeneroId,
                        principalTable: "Generos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Series_Miembros_MiembroId",
                        column: x => x.MiembroId,
                        principalTable: "Miembros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Generos",
                columns: new[] { "Id", "Nombre" },
                values: new object[,]
                {
                    { 1, "Drama" },
                    { 2, "Comedia" },
                    { 3, "Ciencia ficción" },
                    { 4, "Animación" },
                    { 5, "Documental" }
                });

            migrationBuilder.InsertData(
                table: "Miembros",
                columns: new[] { "Id", "Correo", "Nombre", "Registro" },
                values: new object[,]
                {
                    { 1, "ana@club.com", "Ana", new DateOnly(2026, 8, 1) },
                    { 2, "luis@club.com", "Luis", new DateOnly(2026, 8, 3) },
                    { 3, "sofia@club.com", "Sofía", new DateOnly(2026, 8, 10) },
                    { 4, "diego@club.com", "Diego", new DateOnly(2026, 9, 2) }
                });

            migrationBuilder.InsertData(
                table: "Series",
                columns: new[] { "Id", "Estado", "GeneroId", "MiembroId", "Temporadas", "Titulo" },
                values: new object[,]
                {
                    { 1, "Vista", 3, 1, 3, "Dark" },
                    { 2, "Viendo", 2, 2, 9, "The Office" },
                    { 3, "Por ver", 4, 3, 2, "Arcane" },
                    { 4, "Vista", 1, 4, 1, "Chernobyl" },
                    { 5, "Por ver", 5, 1, 3, "Planeta Tierra" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Generos_Nombre",
                table: "Generos",
                column: "Nombre",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Miembros_Correo",
                table: "Miembros",
                column: "Correo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Series_GeneroId",
                table: "Series",
                column: "GeneroId");

            migrationBuilder.CreateIndex(
                name: "IX_Series_MiembroId",
                table: "Series",
                column: "MiembroId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Series");

            migrationBuilder.DropTable(
                name: "Generos");

            migrationBuilder.DropTable(
                name: "Miembros");
        }
    }
}
