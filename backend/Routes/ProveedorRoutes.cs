using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Routes
{
    public static class ProveedorRoutes
    {
        public static void Rutas(WebApplication app)
        {
            // Endpoint para obtener todos los elementos de la tabla de proveedor
            app.MapGet("/proveedor", async ([FromServices] DataContext dbContext) =>
            {
                return Results.Ok(dbContext.Proveedor.Where(p => p.Activo));
            });

            // Endpoint para obtener un proveedor especifico, necesita que le envien un id
            app.MapGet("/proveedor/{id}", async ([FromServices] DataContext dbContext, int id) =>
            {
                var proveedor = await dbContext.Proveedor
                    .Where(p => p.Activo && p.IdProveedor == id)
                    .AsNoTracking()
                    .FirstOrDefaultAsync();

                if (proveedor != null)
                {
                    return Results.Ok(proveedor);
                }
                else
                {
                    return Results.NotFound($"No se encontró ningun proveedor con IdProveedor {id}.");
                }
            });

            // Endpoint para "eliminar" un proveedor, necesita que le envien un id
            app.MapDelete("/proveedor/{id}", async ([FromServices] DataContext dbContext, int id) =>
            {
                var proveedor = await dbContext.Proveedor
                    .Where(p => p.Activo && p.IdProveedor == id)
                    .FirstOrDefaultAsync();

                if (proveedor != null)
                {
                    proveedor.Activo = false;
                    await dbContext.SaveChangesAsync();
                    return Results.Ok(proveedor);
                }
                else
                {
                    return Results.NotFound($"No se encontró ningun proveedor con IdProveedor {id}.");
                }
            });

            // Endpoint para actualiar un proveedor, necestia que se le envie un json con la informacion del
            // proveedor incluyendo el id del mismo.
            app.MapPut("/proveedor/actualizar", async ([FromServices] DataContext dbContext, [FromBody] Proveedor proveedor) =>
            {
                var proveedorExistente = await dbContext.Proveedor.FindAsync(proveedor.IdProveedor);

                if (proveedorExistente == null)
                {
                    return Results.NotFound();
                }

                // Actualizando parametros
                proveedorExistente.Descripcion = proveedor.Descripcion;
                proveedorExistente.Activo = proveedor.Activo;

                try
                {
                    await dbContext.SaveChangesAsync();
                    return Results.Ok(proveedorExistente);
                }
                catch (DbUpdateException)
                {
                    return Results.BadRequest("Error al actualizar el proveedor");
                }
            });

            // Enpoint para agregar un proveedor, necesita que se le envie un json con la informacion de un proveeodr
            // sin inlcuir el id/PK
            app.MapPost("/proveedor/agregar", async ([FromServices] DataContext dbContext, [FromBody] Proveedor proveedor) =>
            {
                try
                {
                    if (await dbContext.Proveedor.AnyAsync(p => p.Descripcion.Equals(proveedor.Descripcion)))
                    {
                        return Results.Conflict("Ya existe un proveedor con la misma descripcion.");
                    }

                    dbContext.Proveedor.Add(proveedor);
                    await dbContext.SaveChangesAsync();

                    return Results.Ok(proveedor);
                }
                catch (Exception ex)
                {

                    Console.Error.WriteLine($"Error al agregar el proveedor: {ex.Message}");
                    return Results.BadRequest("Error inesperado al agregar el proveedor.");
                }
            });

        }
    }
}
