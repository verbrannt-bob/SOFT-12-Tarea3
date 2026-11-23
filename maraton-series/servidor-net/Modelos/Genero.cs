namespace MaratonApi.Modelos;
 
// Una fila de la tabla Generos: el catálogo de géneros.
public class Genero
{
    public int Id { get; set; }
    public string Nombre { get; set; } = "";
 
    // Las series de este género (1 a muchos)
    public List<Serie> Series { get; set; } = [];

    // Los miembros que lo tienen como favorito (muchos a muchos)
    public List<Miembro> Miembros { get; set; } = [];

}
