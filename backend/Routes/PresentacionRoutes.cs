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
            // Endpoint para obtener todos los elementos de la tabla presentacion
            app.MapGet("/presentacion", async ([FromServices] DataContext dbContext) =>
            {
                return Results.Ok(dbContext.Presentacion.Where(p => p.Activo));
            });

            // Enpint para obtener un elemento especifico de la tabla presentacion, necesita que le envien un id
            app.MapGet("/presentacion/{id}", async ([FromServices] DataContext dbContext, int id) =>
            {
                var presentacion = await dbContext.Presentacion
                    .Where(p => p.Activo && p.IdPresentacion == id)
                    .AsNoTracking()
                    .FirstOrDefaultAsync();

                if (presentacion != null)
                {
                    return Results.Ok(presentacion);
                }
                else
                {
                    return Results.NotFound($"No se encontró ninguna presentacion con IdPresentacion {id}.");
                }
            });

            // Enpint para "eliminar" un elemento de la tabla de presentacion, necesita que le envien un id
            app.MapDelete("/presentacion/{id}", async ([FromServices] DataContext dbContext, int id) =>
            {
                var presentacion = await dbContext.Presentacion
                    .Where(p => p.Activo && p.IdPresentacion == id)
                    .FirstOrDefaultAsync();

                if (presentacion != null)
                {
                    presentacion.Activo = false;
                    await dbContext.SaveChangesAsync();
                    return Results.Ok(presentacion);
                }
                else
                {
                    return Results.NotFound($"No se encontró ninguna presentacion con IdPresentacion {id}.");
                }
            });

            // Enpoint para actualizar una presentacion, necesita que se le envie un json con los datos
            // de una presentacion incluyendo el id.
            app.MapPut("/presentacion/actualizar", async ([FromServices] DataContext dbContext, [FromBody] Presentacion presentacion) =>
            {
                var presentacionExistente = await dbContext.Presentacion.FindAsync(presentacion.IdPresentacion);

                if (presentacionExistente == null)
                {
                    return Results.NotFound();
                }

                // Actualizacion de atributos
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

            // Endpoint para agregar una presentacion, necesita que se le envie un json con los datos de una
            // presentacion sin inlcuir el id
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
