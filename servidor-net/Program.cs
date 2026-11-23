using MaratonApi.Datos;
using Microsoft.EntityFrameworkCore;
 
var builder = WebApplication.CreateBuilder(args);
 
// Registrar el DbContext. La cadena de conexión NO está en el código ni en
// appsettings.json: en desarrollo viene de user-secrets.
builder.Services.AddDbContext<MaratonContext>(opciones =>
    opciones.UseSqlServer(builder.Configuration.GetConnectionString("Maraton")));
 
var app = builder.Build();
 
app.MapGet("/", () => "API del Maratón en .NET");
 
// GET /api/miembros  →  [ { _id, nombre } ] ordenados por nombre
app.MapGet("/api/miembros", async (MaratonContext db) =>
    await db.Miembros
        .OrderBy(m => m.Nombre)
        .Select(m => new { _id = m.Id.ToString(), nombre = m.Nombre })
        .ToListAsync());
 
// GET /api/series  →  el mismo JSON que devolvía Express
app.MapGet("/api/series", async (MaratonContext db) =>
    await db.Series
        .OrderBy(s => s.Id)
        .Select(s => new
        {
            _id = s.Id.ToString(),
            titulo = s.Titulo,
            genero = s.Genero!.Nombre,
            temporadas = s.Temporadas,
            estado = s.Estado,
            miembroId = s.MiembroId.ToString(),
            miembro = s.Miembro!.Nombre,
        })
        .ToListAsync());
 
app.Run();
