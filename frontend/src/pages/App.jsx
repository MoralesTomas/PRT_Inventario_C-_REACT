import React from 'react';
import Navbar from '../components/navbar';
import Reports from '../components/Reports';
import Principal from "./Principal"

import MarcasAdmin from "../CRUD/Marca/List.jsx"
import ProveedorAdmin from "../CRUD/Proveedor/List.jsx"
import ProductoAdmin from "../CRUD/Producto/List.jsx"

import DetalleProveedor from "../CRUD/Proveedor/DetalleProveedor.jsx"
import ActualizarProveedor from "../CRUD/Proveedor/ActualizarProveedor.jsx"
import AgregarProveedor from "../CRUD/Proveedor/AgregarProveedor.jsx"

import DetalleProducto from "../CRUD/Producto/DetalleProducto.jsx"
import ActualizarProducto from "../CRUD/Producto/ActualizarProducto.jsx"
import AgregarProducto from "../CRUD/Producto/AgregarProducto.jsx"

import ProductosPorProveedor from '../components/RepProductosProveedor.jsx';
import RepTopMarcasZona from '../components/RepTopMarcasZona.jsx';

// Importar el componente de rutas y el componente de rutas
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  // Retorna el componente de la barra de navegacion y el componente de rutas
  return (
    <>
        <Navbar/>
        <Router>
          <Routes>
            <Route path="/" element={<Principal/>} />
            <Route path="/Reportes" element={<Reports/>} />
            <Route path="/administrar-marcas" element={<MarcasAdmin/>} />

            <Route path="/administrar-proveedores" element={<ProveedorAdmin/>} />
            <Route path="/DetalleProveedor/:idProveedor" element={<DetalleProveedor/>} />
            <Route path="/ActualizarProveedor/:idProveedor" element={<ActualizarProveedor/>} />
            <Route path="/AgregarProveedor" element={<AgregarProveedor/>} />

            <Route path="/administrar-productos" element={<ProductoAdmin/>} />
            <Route path="/DetalleProducto/:idProducto" element={<DetalleProducto/>} />
            <Route path="/ActualizarProducto/:idProducto" element={<ActualizarProducto/>} />
            <Route path="/AgregarProducto" element={<AgregarProducto/>} />

            <Route path="/ProductosPorProveedor" element={<ProductosPorProveedor/>} />
            <Route path="/RepTopMarcasZona" element={<RepTopMarcasZona/>} />


          </Routes>
      </Router>
    </>
  )
}

export default App;