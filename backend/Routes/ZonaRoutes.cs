using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Routes
{
    public static class ZonaRoutes
    {
        public static void Rutas(WebApplication app)
        {
            app.MapGet("/zona", async ([FromServices] DataContext dbContext) =>
            {
                return Results.Ok(dbContext.Zona);
            });

            app.MapPut("/zona/actualizar", async ([FromServices] DataContext dbContext, [FromBody] Zona zona) =>
            {
                var zonaExistente = await dbContext.Zona.FindAsync(zona.IdZona);

                if (zonaExistente == null)
                {
                    return Results.NotFound();
                }

                zonaExistente.Descripcion = zona.Descripcion;
                zonaExistente.Activo = zona.Activo;

                try
                {
                    await dbContext.SaveChangesAsync();
                    return Results.Ok(zona);
                }
                catch (DbUpdateException)
                {
                    return Results.BadRequest("Error al actualizar la zona");
                }
            });

            app.MapPost("/zona/agregar", async ([FromServices] DataContext dbContext, [FromBody] Zona zona) =>
            {
                try
                {
                    if (await dbContext.Zona.AnyAsync(p => p.Descripcion.Equals(zona.Descripcion)))
                    {
                        return Results.Conflict("Ya existe una zona con la misma descripcion.");
                    }

                    dbContext.Zona.Add(zona);
                    await dbContext.SaveChangesAsync();

                    return Results.Ok(zona);
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine($"Error al agregar la zona: {ex.Message}");
                    return Results.BadRequest("Error inesperado al agregar la zona.");
                }
            });

        }
    }
}
