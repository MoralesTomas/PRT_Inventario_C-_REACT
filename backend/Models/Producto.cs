namespace backend.Models
{
    public class Producto
    {
        public int IdProducto { get; set; }
        public int IdMarca { get; set; }
        public int IdPresentacion { get; set; }
        public int IdProveedor { get; set; }
        public int IdZona { get; set; }

        public int Codigo { get; set; }
        public string DescripcionProducto { get; set; }
        public double Precio { get; set; }
        public int Stock { get; set; }
        public int Iva { get; set; }
        public double Peso { get; set; }

        public Marca Marca { get; set; }
        public Presentacion Presentacion { get; set; }
        public Proveedor Proveedor { get; set; }
        public Zona Zona { get; set; }
    }
}
