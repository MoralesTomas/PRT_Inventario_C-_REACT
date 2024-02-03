﻿using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Proveedor
    {
        [Key]
        public int IdProveedor { get; set; }
        public string Descripcion { get; set; }
        public bool Activo { get; set; }
        public ICollection<Producto> Productos { get; set; }  // Propiedad de navegación hacia Productos

    }
}
