# PRUEBA TECNICA - 4_2_2024

---

- [**MoralesTomas**](https://github.com/MoralesTomas)
- [Código del proyecto](https://github.com/MoralesTomas/PRT_Inventario_C-_REACT)

---

# Manual técnico

A continuación, se describe un problema de desarrollo, así como el manual técnico de la solución planteada.

## Descripción

Desarrollo de una aplicación web mediante el uso de C# con .NET, orientado al backend a través de una API REST. Para el frontend, se brinda la flexibilidad de seleccionar entre React o Angular. La aplicación debe componerse de dos proyectos uno para el backend y otro para el frontend y se integra con una base de datos SQL Server y debe incorporar las siguientes funcionalidades clave:

• CRUD (GRID en formulario) de la tabla producto y proveedor

![Untitled](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled.png)

• Generar un reporte General de producto
• Generar un reporte de productos por proveedor
• Crear un Query para consultar top de marcas por zona.
• Exportar reportes a PDF.

---

# Base de datos

Para dar respuesta a lo solicitado se dio a crear una base de datos en **SQL Server** con las tablas y relaciones siguientes:

![Untitled](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%201.png)

### Script del esquema

El script del esquema quedara publicado en el repositorio del proyecto en la carpeta llamada “utilidades” el contenido estará en el archivo llamado “script_esquema.sql”

El script del esquema con datos para insertar estará en la misma carpeta en el archivo llamado “script_db.sql” 

---

# **Backend**

El backend se desarrolló utilizando .NET con C#, empleando MINIMAL API. Las librerías utilizadas fueron:

- Microsoft.EntityFrameworkCore - Versión=7.0.15
- Microsoft.EntityFrameworkCore.SqlServer -  Versión=7.0.15
- Newtonsoft.Json - Versión=13.0.3

### **Descripción de carpetas:**

### **Models**

En esta carpeta se encuentran las clases de C#, las cuales representarán las entidades de la base de datos. Con estas clases, también se especificaron relaciones para que sean útiles en consultas.

Los atributos de los modelos están identificados con el mismo nombre que las columnas de la tabla que buscan representar.

Se utilizaron DataAnnotations para proporcionar algunas especificaciones sobre algunos atributos, como el id de los modelos, para que hicieran referencia a las claves primarias de los registros en sus respectivas tablas.

Ejemplo de un modelo:

```csharp
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Marca
    {
        // Entidad que representara los registros de la tabla marca
        [Key]
        public int IdMarca { get; set; }
        public string Descripcion { get; set; }
        public bool Activo { get; set; }
        public ICollection<Producto> Productos { get; set; }  // Propiedad de navegación hacia Productos

    }
}
```

## Context

Esta carpeta cuanta con la clase que ha sido estructurada para facilitar el uso de Entity Framework. La clase DataContext actúa como el contexto que permite interactuar con EF. Se han agregado propiedades DbSet para cada tabla, representando así cada una como una entidad dentro del contexto. Esto proporciona la conexión necesaria entre el código y la base de datos, permitiendo realizar operaciones CRUD de manera eficiente. Además, la clase cuenta con un constructor que recibe las opciones del contexto al ser instanciado.

```csharp
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Context
{
    // Clase que sera la encargada de contener el contexto para utlizar EF
    public class DataContext : DbContext
    {
        // Agregacion de los DbSet para representar cada tabla como una entidad
        public DbSet<Proveedor> Proveedor { get; set; }
        public DbSet<Presentacion> Presentacion { get; set; }
        public DbSet<Marca> Marca { get; set; }
        public DbSet<Zona> Zona{ get; set; }
        public DbSet<Producto> Producto{ get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    }
}
```

## Routes

La carpeta de "Routes" contiene clases con la estructura que se detalla a continuación:

Clase ProductoRoutes

```csharp
using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace backend.Routes
{
    public static class ProductoRoutes
    {
        public static void Rutas(WebApplication app)
        {
            // Endpoint para obtener todos los elementos de la tabla producto
            app.MapGet("/producto", async ([FromServices] DataContext dbContext) =>
            {
                // ... (Código para obtener todos los productos)
                return Results.Ok(productos);
            });

            // Enpoint para obtener un producto especifico por id, necesita que se le envie un id
            app.MapGet("/producto/{id}", async ([FromServices] DataContext dbContext, int id) =>
            {
                // ... (Código para obtener un producto por ID)
                return producto != null ? Results.Ok(producto) : Results.NotFound($"No se encontró ningun producto con IdProducto {id}.");
            });

            // Endpoint para eliminar un producto, necesita que se le envie un id
            app.MapDelete("/producto/{id}", async ([FromServices] DataContext dbContext, int id) =>
            {
                // ... (Código para eliminar un producto por ID)
                return producto != null ? Results.Ok() : Results.NotFound($"No se encontró ningun producto con IdProducto {id}.");
            });

            // Endpoint para actualizar un producto, necesita que se le envie un json con los datos para un producto incluyendo el id y las FK
            app.MapPut("/producto/actualizar", async ([FromServices] DataContext dbContext, [FromBody] Producto producto) =>
            {
                // ... (Código para actualizar un producto)
                return Results.Ok(productoExistente);
            });

            // Endpoint para agregar un nuevo producto, se debe enviar un json con la data de un producto incluyendo las FK y sin incluir el id de producto.
            app.MapPost("/producto/agregar", async ([FromServices] DataContext dbContext, [FromBody] Producto producto) =>
            {
                // ... (Código para agregar un nuevo producto)
                return Results.Ok(producto);
            });
        }
    }
}

```

Este archivo contiene rutas específicas para las operaciones CRUD relacionadas con la entidad "Producto". Cada método define un endpoint HTTP para realizar acciones como obtener todos los productos, obtener un producto por ID, eliminar un producto, actualizar un producto y agregar un nuevo producto. Estas rutas están diseñadas para interactuar con la base de datos a través del contexto proporcionado por Entity Framework. Se ha implementado un manejo adecuado de errores y respuestas HTTP según sea necesario.

## Descripción del archivo principal Program.cs

Configuración Inicial:

```csharp
// Inicializar el constructor de la aplicación web
var builder = WebApplication.CreateBuilder(args);
```

Este fragmento de código utiliza **`WebApplication.CreateBuilder(args)`** para establecer el entorno inicial de la aplicación web. Esta acción prepara la aplicación para su configuración y construcción posterior.

Configuración de la Conexión a la Base de Datos:

```csharp
// Agregar el servicio de conexión a la base de datos usando Entity Framework
builder.Services.AddSqlServer<DataContext>(builder.Configuration.GetConnectionString("llave"));
```

En este caso, se añade el servicio de conexión a la base de datos mediante Entity Framework. La cadena de conexión se obtiene desde el archivo de configuración (**`appsettings.json`**) bajo la clave "llave". Esto facilita la conexión a la base de datos a través del contexto **`DataContext`**.

Configuración de CORS (Cross-Origin Resource Sharing):

```csharp
// Configurar políticas CORS para permitir solicitudes desde cualquier origen
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
```

En este fragmento, se establecen las políticas CORS para permitir solicitudes desde cualquier origen (**`AllowAnyOrigin`**), con cualquier encabezado (**`AllowAnyHeader`**), y utilizando cualquier método HTTP (**`AllowAnyMethod`**). Esto resulta esencial para posibilitar el consumo de la API desde diferentes dominios.

Construcción de la Aplicación:

```csharp
// Construir la aplicación utilizando el constructor configurado previamente
var app = builder.Build();
```

Se procede a construir la aplicación utilizando el constructor configurado previamente.

Configuración y Uso de CORS:

```csharp
// Habilitar CORS en la aplicación utilizando la política "AllowAll"
app.UseCors("AllowAll");
```

El código habilita CORS en la aplicación mediante la política "AllowAll", permitiendo así la comunicación entre diferentes dominios.

Configuración de Rutas Iniciales:

```csharp
// Definir una ruta inicial que devuelve un mensaje de saludo
app.MapGet("/", () => "Developer -> Morales Tomás");
```

En este segmento, se establece una ruta inicial ("/") que retorna un mensaje de saludo.

Configuración de Rutas para Cada Entidad:

```csharp
// Agregar las rutas para cada entidad utilizando las clases de rutas específicas
ProveedorRoutes.Rutas(app);
PresentacionRoutes.Rutas(app);
MarcaRoutes.Rutas(app);
ZonaRoutes.Rutas(app);
ProductoRoutes.Rutas(app);
ReportRoutes.Rutas(app);
```

Se añaden las rutas correspondientes a cada entidad empleando las clases de rutas específicas. Este enfoque proporciona un mejor orden y modularidad al definir las operaciones CRUD para cada entidad.

Ejecución de la Aplicación:

```csharp
// Ejecutar la aplicación
app.Run();
```

Finalmente, se inicia la aplicación. Este código encapsula la lógica principal que inicia el servidor web y pone en marcha la aplicación backend.

---

# Endpoints

A continuación se dará un ejemplo de las rutas y de los json que se deben enviar en caso de que sean necesarios.

Tomar en cuenta que en este caso se dejara como parte de la ruta el [localhost](http://localhost) y el puerto, pero este cambiara en base a el puerto que se utilice al iniciar la aplicación o al publicarla.

### Proveedor

Solicitud Get → traerá todos los elementos de la tabla proveedor

Ruta: [http://localhost:5154/proveedor](http://localhost:5154/proveedor)

Resultado esperado:

```json
[
    {
        "idProveedor": 1,
        "descripcion": "Proveedor-1-c",
        "activo": true,
        "productos": null
    },
    {
        "idProveedor": 2,
        "descripcion": "Proveedor-2",
        "activo": true,
        "productos": null
    },
    {
        "idProveedor": 3,
        "descripcion": "Proveedor-3",
        "activo": true,
        "productos": null
    },
    {
        "idProveedor": 4,
        "descripcion": "Proveedor-4",
        "activo": true,
        "productos": null
    },
    {
        "idProveedor": 5,
        "descripcion": "Proveedor-5",
        "activo": true,
        "productos": null
    }
]
```

Solicitud Get espcifica → Nos traerá los datos de un proveedor especifico en base a su id

Ruta: [http://localhost:5154/proveedor/1](http://localhost:5154/proveedor/1)

Resultado esperado:

```json
{
    "idProveedor": 1,
    "descripcion": "Proveedor-1-c",
    "activo": true,
    "productos": null
}
```

Solicitud Put → Enviaremos un json con los datos del proveedor a actualizar, es importante enviar el IdProveedor para que todo funcione de manera correcta

Ruta: [http://localhost:5154/proveedor/actualizar](http://localhost:5154/proveedor/actualizar)

Body:

```json
{
    "idProveedor": 6,
    "descripcion": "Proveedor-nuevo",
    "activo": true
}
```

Resultado esperado:

```json
{
    "idProveedor": 6,
    "descripcion": "Proveedor-nuevo",
    "activo": true,
    "productos": null
}
```

Solicitud Delete →  Enviaremos un json con el IdProveedor del proveedor a eliminar, es importante enviar el IdProveedor para que todo funcione de manera correcta. Este eliminar lo que hace realmente es cambiar el estado del atributo “Activo” a la base de datos, lo que hará será dejarlo de tomar en cuenta pero seguirá existiendo en la base de datos.

Ruta: [http://localhost:5154/proveedor/1](http://localhost:5154/proveedor/actualizar) → tomar en cuenta que el parámetro del id va en la ruta

Resultado esperado:

```json
{
    "idProveedor": 1,
    "descripcion": "Proveedor-1-c",
    "activo": false,
    "productos": null
}
```

Solicitud Post → Enviaremos un json con los datos del nuevo proveedor para agregarlo a la base de datos, no debe incluir ningún IdProveedor. Es importante indicar el valor del atributo “Activo”

Ruta: [http://localhost:5154/proveedor/agregar](http://localhost:5154/proveedor/agregar)

Body:

```json
{
    "descripcion": "Proveedor-manual-tecnico",
    "Activo":true
}
```

Resultado esperado:

```json
{
    "idProveedor": 10,
    "descripcion": "Proveedor-manual-tecnico",
    "activo": true,
    "productos": null
}
```

### Producto

Solicitud Get →  traerá todos los elementos de la tabla producto

Ruta: [http://localhost:5154/producto](http://localhost:5154/producto)

Respuesta esperada:

```json
[
    {
        "idProducto": 10,
        "idMarca": 7,
        "idPresentacion": 2,
        "idProveedor": 8,
        "idZona": 5,
        "codigo": 123456,
        "descripcionProducto": "Producto de prueba 1.0-actualizado",
        "precio": 450.00,
        "stock": 2024,
        "iva": 10,
        "peso": 12.00,
        "activo": true,
        "marca": {
            "descripcion": "COCA-COLA-LIGTH"
        },
        "presentacion": {
            "descripcion": "LATA - 350ML"
        },
        "proveedor": {
            "descripcion": "Nuevo proveedor"
        },
        "zona": {
            "descripcion": "ZONA - 5"
        }
    },
    {
        "idProducto": 11,
        "idMarca": 1,
        "idPresentacion": 1,
        "idProveedor": 1,
        "idZona": 1,
        "codigo": 112,
        "descripcionProducto": "Producto de prueba 1.1",
        "precio": 12.99,
        "stock": 100,
        "iva": 12,
        "peso": 0.50,
        "activo": true,
        "marca": {
            "descripcion": "COCA-COLA"
        },
        "presentacion": {
            "descripcion": "BOTELLA - 500ML-CAMBIO"
        },
        "proveedor": {
            "descripcion": "Proveedor-1-c"
        },
        "zona": {
            "descripcion": "ZONA - 1"
        }
    },
    ...
]
```

Solicitud Get espcifica → Nos traerá los datos de un producto especifico en base a su id

Ruta: [http://localhost:5154/producto/10](http://localhost:5154/proveedor/1)

Resultado esperado:

```json
{
    "idProducto": 10,
    "idMarca": 7,
    "idPresentacion": 2,
    "idProveedor": 8,
    "idZona": 5,
    "codigo": 123456,
    "descripcionProducto": "Producto de prueba 1.0-actualizado",
    "precio": 450.00,
    "stock": 2024,
    "iva": 10,
    "peso": 12.00,
    "activo": true,
    "marca": {
        "descripcion": "COCA-COLA-LIGTH"
    },
    "presentacion": {
        "descripcion": "LATA - 350ML"
    },
    "proveedor": {
        "descripcion": "Nuevo proveedor"
    },
    "zona": {
        "descripcion": "ZONA - 5"
    }
}
```

Solicitud Put → Esta solicitud es para actualizar datos del producto, debemos enviar un json con los datos de la entidad producto, es muy importante incluir el IdProducto de manera correcta.

Ruta: [http://localhost:5154/producto/actualizar](http://localhost:5154/producto/actualizar)

Body:

```json
{
    "idProducto": 10,
    "idMarca": 7,
    "idPresentacion": 2,
    "idProveedor": 8,
    "idZona": 5,
    "codigo": 123456,
    "descripcionProducto": "Producto de prueba actualizado",
    "precio": 450.00,
    "stock": 2024,
    "iva": 10,
    "peso": 12.00,
    "activo": true
}
```

Resultado esperado:

```json
{
    "idProducto": 10,
    "idMarca": 7,
    "idPresentacion": 2,
    "idProveedor": 8,
    "idZona": 5,
    "codigo": 123456,
    "descripcionProducto": "Producto de prueba actualizado",
    "precio": 450.00,
    "stock": 2024,
    "iva": 10,
    "peso": 12.00,
    "activo": true,
    "marca": null,
    "presentacion": null,
    "proveedor": null,
    "zona": null
}
```

Solicitud Delete → Esta solicitud recibe el IdProducto mediante la url para poder “eliminar” el producto, esto realmente lo que hace es cambiar el valor del atributo “Activo” a “false” para que ya no se tome en cuente en las consultas.

Ruta: [http://localhost:5154/producto/10](http://localhost:5154/producto/10)

Resultado esperado: Estatus 200

Solicitud Post → Esta solicitud recibe un json con los datos de un producto, es importante incluir los id de las otras entidades que representan las llaves foraneas, no debe incluir la llave del producto dado que esta se genera de manera interna en la base de datos.

Ruta: [http://localhost:5154/producto/agregar](http://localhost:5154/producto/agregar)

Body: 

```json
{
    "idMarca": 3,
    "idPresentacion": 3,
    "idProveedor": 2,
    "idZona": 4,
    "codigo": 666,
    "descripcionProducto": "Producto de test 2019",
    "precio": 66.05,
    "stock": 12,
    "iva": 12,
    "peso": 12.50,
    "activo": true
}
```

Resultado esperado:

```json
{
    "idProducto": 37,
    "idMarca": 3,
    "idPresentacion": 3,
    "idProveedor": 2,
    "idZona": 4,
    "codigo": 666,
    "descripcionProducto": "Producto manual-test",
    "precio": 66.05,
    "stock": 12,
    "iva": 12,
    "peso": 12.50,
    "activo": true,
    "marca": null,
    "presentacion": null,
    "proveedor": null,
    "zona": null
}
```

---

# Frontend

La aplicación fue desarrollada usando **React-Js**, dicha aplicación utiliza componentes para las diferentes vistas.
Dichas vistas cuentan con funcionalidades completas para el apartado de “Proveedor” y de “Producto”, los otros apartados tienen funcionalidades parciales.

### Antes de comenzar

Deberá tener instalado node-js y un administrador de paquetes como npn, yarn o algun otro.

Dependencias de la aplicación:

```jsx
@types/react-dom: v18.2.18
@types/react: v18.2.52
@vitejs/plugin-react: v4.2.1
axios: v1.6.7
bootstrap: v5.3.2
eslint-plugin-react-hooks: v4.6.0
eslint-plugin-react-refresh: v0.4.5
eslint-plugin-react: v7.33.2
eslint: v8.56.0
jspdf-autotable: v3.8.1
jspdf: v2.5.1
react-dom: v18.2.0
react-router-dom: v6.22.0
react: v18.2.0
sweetalert2: v11.10.4
vite: v5.0.12
```

Para instalar las aplicaciones puede utilizar el siguiente comando

```jsx
npm install
```

## Estructura del proyeto

El proyecto se estructuro utilizando componentes asi que existen algunas carpetas para mantener orden de componentes y evitar errores al momento de editar los mismos.

Carpetas

Componentes

En esta carpeta se encuentran los componentes individuales los cuales tendrán responsabilidades especificas para mostrar ciertos elementos o cierta información mediante elementos HTML, esta carpeta contiene componentes generales como el navbar, y el componente que contiene los menús para dirigirnos a diferentes vistas.

CRUD

En esta carpeta se encuentran carpetas individuales con componentes para manejar diferentes componentes de distintas entidades.

Siguen la siguiente lógica:

Proveedor

Contiene los archivos .jsx los cuales tienen el código que retorna diferentes elementos como puede ser el form para actualizar o visualizar un proveedor en especifico así como el archivo “List.js” el cual se encarga de hacer la solicitud para obtener los datos de todos los proveedores y renderizarlos en una tabla.

También contiene el archivo “AgregarProveedor.jsx” el cual contiene un listado de elementos que se encargan de recopilar/mostrar la información para realizar un nuevo registro de un nuevo proveedor.

Pages

En esta carpeta se encuentra el archivo “App.jsx” el cual es el que contiene el código para la asignación de rutas a elementos/componentes .jsx este archivo es el que define que ruta y que elemento se empareja para poder obtener las vistas en base a rutas.

También tiene el archivo “Principal.jsx” el cual es el encargado de retornar el componente de “Menus” para que se pueda interactuar con diferentes cards para visualizar y editar los datos de las entidades.

A nivel general se encuentran los archivos que se sirven como inicio de la aplicacion como el el archivo “main.jsx” el cual contiene la siguiente estructura

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Ademas se encuentra el archivo “ServerConfig.jsx” el cual contiene la direccion url donde se haran las peticiones, esto ayuda a que sea facil de modificar un solo archivo en caso de necesitar cambiar el cominio y no modificar archivo por archivo en caso de que la base del url cambie.

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## **Gestión de Peticiones HTTP y Utilización de Axios**

En el desarrollo del frontend de la aplicación, se implementa una lógica coherente para la realización de peticiones HTTP mediante la biblioteca Axios y la gestión del estado de la aplicación con React Hooks. Este enfoque generalizado se aplica en varios componentes de la aplicación para mantener consistencia y modularidad en la comunicación con el backend. A continuación, se detalla la lógica técnica subyacente.

### **Estructura del Código:**

1. Importación de Bibliotecas y Configuración Inicial

```jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
```

Se importan las bibliotecas necesarias, incluyendo React, y se configuran las dependencias como Axios.

2. Definición de Estados

```jsx
const [data, setData] = useState(null);
```

Se utiliza el hook **`useState`** para definir estados que almacenarán la respuesta de las peticiones HTTP.

3. Realización de Peticiones HTTP

```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('URL_DEL_BACKEND');
      setData(response.data);
    } catch (error) {
      console.error('Error en la petición HTTP:', error.response.data);
    }
  };

  fetchData(); // Llamada a la función de obtención de datos al montar el componente
}, []); // Dependencias vacías para asegurar que la petición se realice una vez al montar el componente

```

Se utiliza el hook **`useEffect`** para realizar la petición HTTP al montar el componente. La función **`fetchData`** maneja la lógica de la petición y actualiza el estado con la respuesta.

4. Renderización de Interfaz con Datos

```jsx
return (
  <div>
    {/* Utilización de los datos almacenados en el estado para construir la interfaz */}
  </div>
);
```

Se renderiza la interfaz utilizando los datos almacenados en el estado, lo que permite una actualización dinámica de la interfaz en función de la respuesta de la petición HTTP.

# Imágenes de referencia

![Captura de pantalla inicial de la aplicación](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%202.png)

Captura de pantalla inicial de la aplicación

![Captura de listado de proveedores](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%203.png)

Captura de listado de proveedores

![Captura de vista de un proveedor individual](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%204.png)

Captura de vista de un proveedor individual

![Captura de listado de productos](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%205.png)

Captura de listado de productos

![Captura de detalles de un producto especifico.](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%206.png)

Captura de detalles de un producto especifico.

![Captura de reporte de un producto especifico exportado a PDF](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%207.png)

Captura de reporte de un producto especifico exportado a PDF

![Captura de reporte de listado de productos exportado a PDF](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%208.png)

Captura de reporte de listado de productos exportado a PDF

![Captura al intentar editar un producto.](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%209.png)

Captura al intentar editar un producto.

![Captura de intento de eliminación de un producto](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%2010.png)

Captura de intento de eliminación de un producto

![Captura de menú de reportes](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%2011.png)

Captura de menú de reportes

![Captura de reporte de productos por proveedor](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%2012.png)

Captura de reporte de productos por proveedor

![Captura de reporte de productos por proveedor exportado a PDF](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%2013.png)

Captura de reporte de productos por proveedor exportado a PDF

![Captura de reporte de top marcas por zona](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%2014.png)

Captura de reporte de top marcas por zona

![Captura de reporte de top marcas por zona exportado a pdf](PRUEBA%20TECNICA%20-%204_2_2024%207b1335ee5f7841dbb7e5b4c6a9ddb551/Untitled%2015.png)

Captura de reporte de top marcas por zona exportado a pdf
