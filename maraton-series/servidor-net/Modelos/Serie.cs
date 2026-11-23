namespace MaratonApi.Modelos;
 
// Una fila de la tabla Series.
public class Serie
{
    public int Id { get; set; }
    public string Titulo { get; set; } = "";
    public int Temporadas { get; set; }
    public string Estado { get; set; } = "Por ver";
 
    // Clave foránea + navegación: la serie pertenece a UN género
    public int GeneroId { get; set; }
    public Genero? Genero { get; set; }
 
    // Clave foránea + navegación: la serie la propuso UN miembro
    public int MiembroId { get; set; }
    public Miembro? Miembro { get; set; }
}
