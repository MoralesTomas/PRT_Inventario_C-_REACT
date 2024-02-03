using backend.Context;
using backend.Routes;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Agregar la llave de coneccion
builder.Services.AddSqlServer<DataContext>(builder.Configuration.GetConnectionString("llave"));

// Agregar CORS para que cualquier servicio lo consuma por ahora.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();
app.UseCors("AllowAll");

app.MapGet("/", () => "Hello World!");

MarcaRoutes.Rutas(app);

app.Run();
