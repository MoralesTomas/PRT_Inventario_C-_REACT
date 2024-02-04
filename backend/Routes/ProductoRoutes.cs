using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;
using Newtonsoft.Json;

namespace backend.Routes
{
    public static class ProductoRoutes
    {
        public static void Rutas(WebApplication app)
        {
            // Enpoint para obtener todos los elementos de la tabla producto
            app.MapGet("/producto", async ([FromServices] DataContext dbContext) =>
            {
                var productos = dbContext.Producto
                    .Where(p => p.Activo)
                .Select(p => new    // Se seleccionan los atriutos que queremos retornar
                {
                    p.IdProducto,
                    p.IdMarca,
                    p.IdPresentacion,
                    p.IdProveedor,
                    p.IdZona,
                    p.Codigo,
                    p.DescripcionProducto,
                    p.Precio,
                    p.Stock,
                    p.Iva,
                    p.Peso,
                    p.Activo,
                    Marca = new
                    {
                        p.Marca.Descripcion
                    },
                    Presentacion = new
                    {
                        p.Presentacion.Descripcion
                    },
                    Proveedor = new
                    {
                        p.Proveedor.Descripcion
                    },
                    Zona = new
                    {
                        p.Zona.Descripcion
                    }
                });

                return Results.Ok(productos);
            });

            // Enpoint para obtener un producto especifico por id, necesita que se le envie un id
            app.MapGet("/producto/{id}", async ([FromServices] DataContext dbContext, int id) =>
            {
                var producto = await dbContext.Producto
                    .Where(p => p.Activo && p.IdProducto== id)
                    .Select(p => new // Se seleccionan los atributos que queremos que retorne 
                    {
                        p.IdProducto,
                        p.IdMarca,
                        p.IdPresentacion,
                        p.IdProveedor,
                        p.IdZona,
                        p.Codigo,
                        p.DescripcionProducto,
                        p.Precio,
                        p.Stock,
                        p.Iva,
                        p.Peso,
                        p.Activo,
                        Marca = new
                        {
                            p.Marca.Descripcion
                        },
                        Presentacion = new
                        {
                            p.Presentacion.Descripcion
                        },
                        Proveedor = new
                        {
                            p.Proveedor.Descripcion
                        },
                        Zona = new
                        {
                            p.Zona.Descripcion
                        }
                    })
                    .AsNoTracking()
                    .FirstOrDefaultAsync();

                if (producto != null)
                {
                    return Results.Ok(producto);
                }
                else
                {
                    return Results.NotFound($"No se encontró ningun producto con IdProducto {id}.");
                }
            });

            // Endpoint para eliminar un producto, necesita que se le envie un id
            app.MapDelete("/producto/{id}", async ([FromServices] DataContext dbContext, int id) =>
            {
                var producto = await dbContext.Producto
                    .Where(p => p.Activo && p.IdProducto == id)
                    .FirstOrDefaultAsync();

                if (producto != null)
                {
                    // Se cambia su estado para simular un delete
                    producto.Activo = false;
                    await dbContext.SaveChangesAsync();
                    return Results.Ok();
                }
                else
                {
                    return Results.NotFound($"No se encontró ningun producto con IdProducto {id}.");
                }
            });

            // Endpoint para actualizar un producto, necesita que se le envie un json con los datos para un 
            // producto incluyendo el id y las FK
            app.MapPut("/producto/actualizar", async ([FromServices] DataContext dbContext, [FromBody] Producto producto) =>
            {
                var productoExistente = await dbContext.Producto.FindAsync(producto.IdProducto);

                if (productoExistente == null)
                {
                    return Results.NotFound();
                }

                try
                {
                    // Actualizacion de atributos
                    productoExistente.IdMarca = producto.IdMarca;
                    productoExistente.IdPresentacion = producto.IdPresentacion;
                    productoExistente.IdProveedor = producto.IdProveedor;
                    productoExistente.IdZona = producto.IdZona;

                    productoExistente.Codigo = producto.Codigo;
                    productoExistente.DescripcionProducto = producto.DescripcionProducto;
                    productoExistente.Precio = producto.Precio;
                    productoExistente.Stock = producto.Stock;
                    productoExistente.Iva = producto.Iva;
                    productoExistente.Peso = producto.Peso;


                    await dbContext.SaveChangesAsync();
                    return Results.Ok(productoExistente);
                }
                catch (DbUpdateException)
                {
                    return Results.BadRequest("Error al actualizar el producto");
                }
            });

            // Endpoint para agregar un nuevo producto, se debe enviar un json con la data de un producto incluyendo
            // las FK y sin incluir el id de producto.
            app.MapPost("/producto/agregar", async ([FromServices] DataContext dbContext, [FromBody] Producto producto) =>
            {
                try
                {
                    if (await dbContext.Producto.AnyAsync(p => p.IdMarca == producto.IdMarca &&
                        p.IdPresentacion == producto.IdPresentacion &&
                        p.IdProveedor == producto.IdProveedor &&
                        p.IdZona == producto.IdZona &&
                        p.Codigo == producto.Codigo &&
                        p.DescripcionProducto.Equals(producto.DescripcionProducto) &&
                        p.Precio == producto.Precio &&
                        p.Stock == producto.Stock &&
                        p.Iva == producto.Iva &&
                        p.Peso == producto.Peso
                    ))
                    {
                        return Results.Conflict("Ya existe un producto con las mismas caracteristicas.");
                    }

                    dbContext.Producto.Add(producto);
                    await dbContext.SaveChangesAsync();

                    return Results.Ok(producto);
                }
                catch (Exception ex)
                {

                    Console.Error.WriteLine($"Error al agregar el producto: {ex.Message}");
                    return Results.BadRequest("Error inesperado al agregar el producto.");
                }
            });

        }
    }
}
