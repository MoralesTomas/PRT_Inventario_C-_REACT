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
                return Results.Ok(dbContext.Zona.Where(p => p.Activo));
            });

            app.MapGet("/zona/{id}", async ([FromServices] DataContext dbContext, int id) =>
            {
                var zona = await dbContext.Zona
                    .Where(p => p.Activo && p.IdZona== id)
                    .FirstOrDefaultAsync();

                if (zona != null)
                {
                    return Results.Ok(zona);
                }
                else
                {
                    return Results.NotFound($"No se encontró ninguna zona con IdZona {id}.");
                }
            });

            app.MapDelete("/zona/{id}", async ([FromServices] DataContext dbContext, int id) =>
            {
                var zona = await dbContext.Zona
                    .Where(p => p.Activo && p.IdZona == id)
                    .AsNoTracking()
                    .FirstOrDefaultAsync();

                if (zona != null)
                {
                    zona.Activo = false;
                    await dbContext.SaveChangesAsync();
                    return Results.Ok(zona);
                }
                else
                {
                    return Results.NotFound($"No se encontró ninguna zona con IdZona {id}.");
                }
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
