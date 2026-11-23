namespace MaratonApi.Modelos;
 
// Una fila de la tabla Miembros.
public class Miembro
{
    public int Id { get; set; }
    public string Nombre { get; set; } = "";
    public string Correo { get; set; } = "";
    public DateOnly Registro { get; set; }
 
    // Las series que propuso (1 a muchos)
    public List<Serie> Series { get; set; } = [];

    // Sus géneros favoritos (muchos a muchos)
    public List<Genero> GenerosFavoritos { get; set; } = [];

}

