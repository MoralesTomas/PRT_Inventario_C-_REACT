namespace backend.Models
{
    public class Marca
    {
        public int IdMarca { get; set; }
        public string Descripcion { get; set; }
        public ICollection<Producto> Productos { get; set; }  // Propiedad de navegación hacia Productos

    }
}
