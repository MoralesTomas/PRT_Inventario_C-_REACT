using backend.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Routes
{
    public static class ReportRoutes
    {
        public static void Rutas(WebApplication app)
        {
            app.MapGet("/reporte/productos-proveedor", async ([FromServices] DataContext dbContext) =>
            {
                var elementos = dbContext.Proveedor.Where(p => p.Activo).Include(p=>p.Productos);
                var respuesta = elementos.Select(p => new
                {
                    p.IdProveedor,
                    p.Descripcion,
                    Productos = p.Productos.Select( e => new
                    {
                        e.IdProducto,
                        e.IdMarca,
                        e.IdPresentacion,
                        e.IdProveedor,
                        e.IdZona,
                        e.Codigo,
                        e.DescripcionProducto,
                        e.Precio,
                        e.Stock,
                        e.Iva,
                        e.Peso,
                        e.Activo,
                        Marca = new
                        {
                            e.Marca.Descripcion
                        },
                        Presentacion = new
                        {
                            e.Presentacion.Descripcion
                        },
                        Zona = new
                        {
                            e.Zona.Descripcion
                        }
                    })
                });

                return Results.Ok(respuesta);
            });

            app.MapGet("/reporte/top-marcas-zona", async ([FromServices] DataContext dbContext) =>
            {
                try
                {
                    var topMarcasPorZona = dbContext.Producto
                        .GroupBy(p => p.IdZona)
                        .Select(zonaGroup => new
                        {
                            IdZona = zonaGroup.Key,
                            DescripCionZona = dbContext.Zona
                                .Where(m => m.IdZona == zonaGroup.Key)
                                .Select(m => m.Descripcion)
                                .FirstOrDefault(),
                            TopMarcas = zonaGroup
                                .GroupBy(producto => producto.IdMarca)
                                .Select(marcaGroup => new
                                {
                                    IdMarca = marcaGroup.Key,
                                    DescripcionMarca = dbContext.Marca
                                        .Where(m => m.IdMarca == marcaGroup.Key)
                                        .Select(m => m.Descripcion)
                                        .FirstOrDefault(),
                                    CantidadProductos = marcaGroup.Count()
                                })
                                .OrderByDescending(m => m.CantidadProductos)
                                .ToList()
                        })
                        .ToList();

                    return Results.Ok(topMarcasPorZona);
                }
                catch (Exception ex)
                {
                    return Results.BadRequest($"Error al obtener el top de marcas por zona: {ex.Message}");
                }
            });

        }
    }
}
