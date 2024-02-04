using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Marca
    {
        // Entidad que representara los registros de la tabla marca
        [Key]
        public int IdMarca { get; set; }
        public string Descripcion { get; set; }
        public bool Activo { get; set; }
        public ICollection<Producto> Productos { get; set; }  // Propiedad de navegación hacia Productos

    }
}
