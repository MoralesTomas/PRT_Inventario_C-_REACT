﻿namespace backend.Models
{
    public class Presentacion
    {
        public int IdPresentacion { get; set; }
        public string Descripcion { get; set; }
        public ICollection<Producto> Productos { get; set; }  // Propiedad de navegación hacia Productos

    }
}