using backend.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Routes
{
    public static class ReportRoutes
    {
        public static void Rutas(WebApplication app)
        {
            // Enpoint para obtener el reporte de productos por proveedor
            app.MapGet("/reporte/productos-proveedor", async ([FromServices] DataContext dbContext) =>
            {
                // Obtener una lista de todos los proveedores que esten activos, e inlcuir los productos que los tengan
                // como FK esto utilizando include gracias a las bondades de EF
                var elementos = dbContext.Proveedor.Where(p => p.Activo).Include(p=>p.Productos);

                // Determinar los atributos que queremos retornar en la peticion.
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

            // Endpoint para obtener los datos para el reporte de tip marcas por zona
            app.MapGet("/reporte/top-marcas-zona", async ([FromServices] DataContext dbContext) =>
            {
                try
                {
                    var topMarcasPorZona = dbContext.Producto   // Utilizamos la tabla de producto
                        .GroupBy(p => p.IdZona) // agrupamos los elementos por la FK del IdZona
                        .Select(zonaGroup => new    // Deleccionamos que atributos retornaremos en la peticion
                        {
                            IdZona = zonaGroup.Key, // Asignamos el valor del agrupamiento
                            DescripCionZona = dbContext.Zona    // Utilizamos la tabla zona para obtener la descripcion de la misma
                                .Where(m => m.IdZona == zonaGroup.Key)
                                .Select(m => m.Descripcion)
                                .FirstOrDefault(),
                            TopMarcas = zonaGroup
                                .GroupBy(producto => producto.IdMarca)  // Agrupamos por IdMarca
                                .Select(marcaGroup => new   // Seleccionamos los atributos a retornar
                                {
                                    IdMarca = marcaGroup.Key,
                                    DescripcionMarca = dbContext.Marca
                                        .Where(m => m.IdMarca == marcaGroup.Key)
                                        .Select(m => m.Descripcion)
                                        .FirstOrDefault(),
                                    CantidadProductos = marcaGroup.Count()  // Hacemos un count de los ementos de cada marca
                                })
                                .OrderByDescending(m => m.CantidadProductos)    // Ordenamos de manera descendente
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
