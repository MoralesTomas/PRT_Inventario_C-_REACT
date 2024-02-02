namespace backend.Models
{
    public class Proveedor
    {
        public int IdProveedor { get; set; }
        public string Descripcion { get; set; }

        public ICollection<Producto> Productos { get; set; }  // Propiedad de navegación hacia Productos

    }
}
