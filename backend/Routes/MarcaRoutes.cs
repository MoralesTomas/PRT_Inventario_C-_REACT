﻿using backend.Context;
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
                return Results.Ok(dbContext.Marca);
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