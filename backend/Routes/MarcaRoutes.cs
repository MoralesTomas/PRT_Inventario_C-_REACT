using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Routes
{
    public static class MarcaRoutes
    {
        public static void Rutas(WebApplication app)
        {
            app.MapGet("/marca", async ([FromServices] DataContext dbContext) =>
            {
                return Results.Ok(dbContext.Marca.Where(p=> p.Activo).AsNoTracking());
            });

            app.MapGet("/marca/{id}", async ([FromServices] DataContext dbContext, int id) =>
            {
                var marca = await dbContext.Marca
                    .Where(p => p.Activo && p.IdMarca == id)
                    .AsNoTracking()
                    .FirstOrDefaultAsync();

                if (marca != null)
                {
                    return Results.Ok(marca);
                }
                else
                {
                    return Results.NotFound($"No se encontró ninguna marca con IdMarca {id}.");
                }
            });

            app.MapDelete("/marca/{id}", async ([FromServices] DataContext dbContext, int id) =>
            {
                var marca = await dbContext.Marca
                    .Where(p => p.Activo && p.IdMarca == id)
                    .FirstOrDefaultAsync();

                if (marca != null)
                {
                    marca.Activo = false;
                    await dbContext.SaveChangesAsync();
                    return Results.Ok(marca);
                }
                else
                {
                    return Results.NotFound($"No se encontró ninguna marca con IdMarca {id}.");
                }
            });


            app.MapPut("/marca/actualizar", async ([FromServices] DataContext dbContext, [FromBody] Marca marca) =>
            {
                var marcaExistente = await dbContext.Marca.FindAsync(marca.IdMarca);

                if (marcaExistente == null)
                {
                    return Results.NotFound();
                }

                marcaExistente.Descripcion = marca.Descripcion;
                marcaExistente.Activo = marca.Activo;

                try
                {
                    await dbContext.SaveChangesAsync();
                    return Results.Ok(marcaExistente);
                }
                catch (DbUpdateException)
                {
                    return Results.BadRequest("Error al actualizar la marca");
                }
            });

            app.MapPost("/marca/agregar", async ([FromServices] DataContext dbContext, [FromBody] Marca marca) =>
            {
                try
                {
                    if (await dbContext.Marca.AnyAsync(m => m.Descripcion.Equals(marca.Descripcion)))
                    {
                        return Results.Conflict("Ya existe una marca con la misma descripcion.");
                    }

                    dbContext.Marca.Add(marca);
                    await dbContext.SaveChangesAsync();

                    return Results.Ok(marca);
                }
                catch (Exception ex)
                {

                    Console.Error.WriteLine($"Error al agregar la marca: {ex.Message}");
                    return Results.BadRequest("Error inesperado al agregar la marca.");
                }
            });

        }
    }
}
