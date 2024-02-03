using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Context
{
    public class DataContext : DbContext
    {
        public DbSet<Proveedor> Proveedor { get; set; }
        public DbSet<Presentacion> Presentacion { get; set; }

        public DbSet<Marca> Marca { get; set; }
        public DbSet<Zona> Zona{ get; set; }
        public DbSet<Producto> Producto{ get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    }
}
