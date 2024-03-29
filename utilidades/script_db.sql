USE [master]
GO
/****** Object:  Database [inventario]    Script Date: 3/02/2024 15:54:20 ******/
CREATE DATABASE [inventario]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'inventario', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\inventario.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'inventario_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\inventario_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [inventario] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [inventario].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [inventario] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [inventario] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [inventario] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [inventario] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [inventario] SET ARITHABORT OFF 
GO
ALTER DATABASE [inventario] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [inventario] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [inventario] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [inventario] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [inventario] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [inventario] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [inventario] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [inventario] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [inventario] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [inventario] SET  DISABLE_BROKER 
GO
ALTER DATABASE [inventario] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [inventario] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [inventario] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [inventario] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [inventario] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [inventario] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [inventario] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [inventario] SET RECOVERY FULL 
GO
ALTER DATABASE [inventario] SET  MULTI_USER 
GO
ALTER DATABASE [inventario] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [inventario] SET DB_CHAINING OFF 
GO
ALTER DATABASE [inventario] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [inventario] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [inventario] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [inventario] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'inventario', N'ON'
GO
ALTER DATABASE [inventario] SET QUERY_STORE = OFF
GO
USE [inventario]
GO
/****** Object:  Table [dbo].[marca]    Script Date: 3/02/2024 15:54:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[marca](
	[IdMarca] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](100) NOT NULL,
	[Activo] [bit] NULL,
 CONSTRAINT [PK_marca] PRIMARY KEY CLUSTERED 
(
	[IdMarca] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[presentacion]    Script Date: 3/02/2024 15:54:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[presentacion](
	[IdPresentacion] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](100) NOT NULL,
	[Activo] [bit] NULL,
 CONSTRAINT [PK_presentacion] PRIMARY KEY CLUSTERED 
(
	[IdPresentacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[producto]    Script Date: 3/02/2024 15:54:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[producto](
	[IdProducto] [int] IDENTITY(1,1) NOT NULL,
	[IdMarca] [int] NULL,
	[IdPresentacion] [int] NULL,
	[IdProveedor] [int] NULL,
	[IdZona] [int] NULL,
	[Codigo] [int] NULL,
	[DescripcionProducto] [varchar](1000) NULL,
	[Precio] [decimal](18, 2) NOT NULL,
	[Stock] [int] NOT NULL,
	[Iva] [int] NULL,
	[Peso] [decimal](18, 2) NULL,
	[Activo] [bit] NULL,
 CONSTRAINT [PK_pruducto] PRIMARY KEY CLUSTERED 
(
	[IdProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[proveedor]    Script Date: 3/02/2024 15:54:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[proveedor](
	[IdProveedor] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](100) NOT NULL,
	[Activo] [bit] NULL,
 CONSTRAINT [PK_proveedor] PRIMARY KEY CLUSTERED 
(
	[IdProveedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[zona]    Script Date: 3/02/2024 15:54:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[zona](
	[IdZona] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
	[Activo] [bit] NULL,
 CONSTRAINT [PK_zona] PRIMARY KEY CLUSTERED 
(
	[IdZona] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[marca] ON 

INSERT [dbo].[marca] ([IdMarca], [Descripcion], [Activo]) VALUES (1, N'COCA-COLA', 1)
INSERT [dbo].[marca] ([IdMarca], [Descripcion], [Activo]) VALUES (2, N'PEPSI-COLA', 1)
INSERT [dbo].[marca] ([IdMarca], [Descripcion], [Activo]) VALUES (3, N'INTEL', 1)
INSERT [dbo].[marca] ([IdMarca], [Descripcion], [Activo]) VALUES (4, N'LENOVO', 1)
INSERT [dbo].[marca] ([IdMarca], [Descripcion], [Activo]) VALUES (7, N'COCA-COLA-LIGTH', 1)
SET IDENTITY_INSERT [dbo].[marca] OFF
GO
SET IDENTITY_INSERT [dbo].[presentacion] ON 

INSERT [dbo].[presentacion] ([IdPresentacion], [Descripcion], [Activo]) VALUES (1, N'BOTELLA - 500ML-CAMBIO', 1)
INSERT [dbo].[presentacion] ([IdPresentacion], [Descripcion], [Activo]) VALUES (2, N'LATA - 350ML', 1)
INSERT [dbo].[presentacion] ([IdPresentacion], [Descripcion], [Activo]) VALUES (3, N'BOTELLA - 1000ML', 1)
INSERT [dbo].[presentacion] ([IdPresentacion], [Descripcion], [Activo]) VALUES (4, N'DESECHABLE - 500ML', 1)
INSERT [dbo].[presentacion] ([IdPresentacion], [Descripcion], [Activo]) VALUES (5, N'BOTELLA - 600ML', 1)
SET IDENTITY_INSERT [dbo].[presentacion] OFF
GO
SET IDENTITY_INSERT [dbo].[producto] ON 

INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (10, 1, 1, 1, 1, 111, N'Producto de prueba 1.0', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (11, 1, 1, 1, 1, 112, N'Producto de prueba 1.1', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (12, 1, 1, 1, 1, 113, N'Producto de prueba 1.2', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (13, 2, 1, 1, 1, 211, N'Producto de prueba 2.0', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (14, 2, 1, 1, 1, 212, N'Producto de prueba 2.1', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (15, 3, 1, 1, 1, 310, N'Producto de prueba 3.0', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (16, 2, 1, 1, 2, 221, N'Producto de prueba 2.0', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (17, 2, 1, 1, 2, 222, N'Producto de prueba 2.1', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (18, 2, 1, 1, 2, 223, N'Producto de prueba 2.2', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (19, 3, 1, 1, 2, 321, N'Producto de prueba 2.0', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (20, 3, 1, 1, 2, 322, N'Producto de prueba 2.1', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (21, 1, 1, 1, 2, 120, N'Producto de prueba 3.0', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (22, 3, 1, 1, 3, 331, N'Producto de prueba 3.0', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (23, 3, 1, 1, 3, 332, N'Producto de prueba 3.1', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (24, 3, 1, 1, 3, 333, N'Producto de prueba 3.2', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (25, 1, 1, 1, 3, 131, N'Producto de prueba 1.0', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (26, 1, 1, 1, 3, 132, N'Producto de prueba 1.1', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
INSERT [dbo].[producto] ([IdProducto], [IdMarca], [IdPresentacion], [IdProveedor], [IdZona], [Codigo], [DescripcionProducto], [Precio], [Stock], [Iva], [Peso], [Activo]) VALUES (27, 2, 1, 1, 3, 230, N'Producto de prueba 2.0', CAST(12.99 AS Decimal(18, 2)), 100, 12, CAST(0.50 AS Decimal(18, 2)), 1)
SET IDENTITY_INSERT [dbo].[producto] OFF
GO
SET IDENTITY_INSERT [dbo].[proveedor] ON 

INSERT [dbo].[proveedor] ([IdProveedor], [Descripcion], [Activo]) VALUES (1, N'Proveedor-1', 1)
INSERT [dbo].[proveedor] ([IdProveedor], [Descripcion], [Activo]) VALUES (2, N'Proveedor-2', 1)
INSERT [dbo].[proveedor] ([IdProveedor], [Descripcion], [Activo]) VALUES (3, N'Proveedor-3', 1)
INSERT [dbo].[proveedor] ([IdProveedor], [Descripcion], [Activo]) VALUES (4, N'Proveedor-4', 1)
INSERT [dbo].[proveedor] ([IdProveedor], [Descripcion], [Activo]) VALUES (5, N'Proveedor-5', 1)
INSERT [dbo].[proveedor] ([IdProveedor], [Descripcion], [Activo]) VALUES (6, N'Proveedor-nuevo', 1)
INSERT [dbo].[proveedor] ([IdProveedor], [Descripcion], [Activo]) VALUES (7, N'Proveedor-nuevo-2', 1)
SET IDENTITY_INSERT [dbo].[proveedor] OFF
GO
SET IDENTITY_INSERT [dbo].[zona] ON 

INSERT [dbo].[zona] ([IdZona], [Descripcion], [Activo]) VALUES (1, N'ZONA - 1', 1)
INSERT [dbo].[zona] ([IdZona], [Descripcion], [Activo]) VALUES (2, N'ZONA - 2', 1)
INSERT [dbo].[zona] ([IdZona], [Descripcion], [Activo]) VALUES (3, N'ZONA - 3', 1)
INSERT [dbo].[zona] ([IdZona], [Descripcion], [Activo]) VALUES (4, N'ZONA - 4', 1)
INSERT [dbo].[zona] ([IdZona], [Descripcion], [Activo]) VALUES (5, N'ZONA - 5', 1)
INSERT [dbo].[zona] ([IdZona], [Descripcion], [Activo]) VALUES (6, N'ZONA - 6', 1)
SET IDENTITY_INSERT [dbo].[zona] OFF
GO
ALTER TABLE [dbo].[marca] ADD  CONSTRAINT [DF_marca_Activo]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[presentacion] ADD  CONSTRAINT [DF_presentacion_Activo]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[producto] ADD  CONSTRAINT [DF_pruducto_Activo]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[proveedor] ADD  CONSTRAINT [DF_proveedor_Activo]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[zona] ADD  CONSTRAINT [DF_zona_Activo]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[producto]  WITH CHECK ADD  CONSTRAINT [FK_pruducto_marca] FOREIGN KEY([IdMarca])
REFERENCES [dbo].[marca] ([IdMarca])
GO
ALTER TABLE [dbo].[producto] CHECK CONSTRAINT [FK_pruducto_marca]
GO
ALTER TABLE [dbo].[producto]  WITH CHECK ADD  CONSTRAINT [FK_pruducto_presentacion] FOREIGN KEY([IdPresentacion])
REFERENCES [dbo].[presentacion] ([IdPresentacion])
GO
ALTER TABLE [dbo].[producto] CHECK CONSTRAINT [FK_pruducto_presentacion]
GO
ALTER TABLE [dbo].[producto]  WITH CHECK ADD  CONSTRAINT [FK_pruducto_proveedor] FOREIGN KEY([IdProveedor])
REFERENCES [dbo].[proveedor] ([IdProveedor])
GO
ALTER TABLE [dbo].[producto] CHECK CONSTRAINT [FK_pruducto_proveedor]
GO
ALTER TABLE [dbo].[producto]  WITH CHECK ADD  CONSTRAINT [FK_pruducto_zona] FOREIGN KEY([IdZona])
REFERENCES [dbo].[zona] ([IdZona])
GO
ALTER TABLE [dbo].[producto] CHECK CONSTRAINT [FK_pruducto_zona]
GO
USE [master]
GO
ALTER DATABASE [inventario] SET  READ_WRITE 
GO
