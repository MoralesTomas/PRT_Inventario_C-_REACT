using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Presentacion
    {
        // Entidad que representara los registros de la tabla presentacion
        [Key]
        public int IdPresentacion { get; set; }
        public string Descripcion { get; set; }
        public bool Activo { get; set; }
        public ICollection<Producto> Productos { get; set; }  // Propiedad de navegación hacia Productos

    }
}
