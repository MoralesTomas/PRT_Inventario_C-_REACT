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
            app.MapGet("/proveedor", async ([FromServices] DataContext dbContext) =>
            {
                return Results.Ok(dbContext.Proveedor);
            });

            app.MapPut("/proveedor/actualizar", async ([FromServices] DataContext dbContext, [FromBody] Proveedor proveedor) =>
            {
                var proveedorExistente = await dbContext.Proveedor.FindAsync(proveedor.IdProveedor);

                if (proveedorExistente == null)
                {
                    return Results.NotFound();
                }

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
