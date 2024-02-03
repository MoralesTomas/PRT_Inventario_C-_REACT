using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Producto
    {
        [Key]
        public int IdProducto { get; set; }
        public int IdMarca { get; set; }
        public int IdPresentacion { get; set; }
        public int IdProveedor { get; set; }
        public int IdZona { get; set; }

        public int Codigo { get; set; }
        public string DescripcionProducto { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }
        public int Iva { get; set; }
        public decimal Peso { get; set; }
        public bool Activo { get; set; }


        [ForeignKey("IdMarca")]
        public Marca Marca { get; set; }

        [ForeignKey("IdPresentacion")]
        public Presentacion Presentacion { get; set; }

        [ForeignKey("IdProveedor")]
        public Proveedor Proveedor { get; set; }

        [ForeignKey("IdZona")]
        public Zona Zona { get; set; }
    }
}
