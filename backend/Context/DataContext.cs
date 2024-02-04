using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Context
{
    // Clase que sera la encargada de contener el contexto para utlizar EF
    public class DataContext : DbContext
    {
        // Agregacion de los DbSet para representar cada tabla como una entidad
        public DbSet<Proveedor> Proveedor { get; set; }
        public DbSet<Presentacion> Presentacion { get; set; }
        public DbSet<Marca> Marca { get; set; }
        public DbSet<Zona> Zona{ get; set; }
        public DbSet<Producto> Producto{ get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    }
}
