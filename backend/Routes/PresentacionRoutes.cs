using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Routes
{
    public static class PresentacionRoutes
    {
        public static void Rutas(WebApplication app)
        {
            app.MapGet("/presentacion", async ([FromServices] DataContext dbContext) =>
            {
                return Results.Ok(dbContext.Presentacion.Where(p => p.Activo));
            });

            app.MapPut("/presentacion/actualizar", async ([FromServices] DataContext dbContext, [FromBody] Presentacion presentacion) =>
            {
                var presentacionExistente = await dbContext.Presentacion.FindAsync(presentacion.IdPresentacion);

                if (presentacionExistente == null)
                {
                    return Results.NotFound();
                }

                presentacionExistente.Descripcion = presentacion.Descripcion;
                presentacionExistente.Activo = presentacion.Activo;

                try
                {
                    await dbContext.SaveChangesAsync();
                    return Results.Ok(presentacionExistente);
                }
                catch (DbUpdateException)
                {
                    return Results.BadRequest("Error al actualizar la presentacion");
                }
            });

            app.MapPost("/presentacion/agregar", async ([FromServices] DataContext dbContext, [FromBody] Presentacion presentacion) =>
            {
                try
                {
                    if (await dbContext.Presentacion.AnyAsync(p => p.Descripcion.Equals(presentacion.Descripcion)))
                    {
                        return Results.Conflict("Ya existe una presentacion con la misma descripcion.");
                    }

                    dbContext.Presentacion.Add(presentacion);
                    await dbContext.SaveChangesAsync();

                    return Results.Ok(presentacion);
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine($"Error al agregar la presentacion: {ex.Message}");
                    return Results.BadRequest("Error inesperado al agregar la presentacion.");
                }
            });

        }
    }
}
