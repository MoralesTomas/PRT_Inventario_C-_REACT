﻿namespace backend.Models
{
    public class Zona
    {
        public int IdZona { get; set; }
        public string Descripcion { get; set; }
        public ICollection<Producto> Productos { get; set; }  // Propiedad de navegación hacia Productos

    }
}
