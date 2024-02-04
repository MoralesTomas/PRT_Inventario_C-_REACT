import React from 'react';
import Navbar from '../components/navbar';
import Principal from "./Principal"

import MarcasAdmin from "../CRUD/Marca/List.jsx"
import ProveedorAdmin from "../CRUD/Proveedor/List.jsx"
import ProductoAdmin from "../CRUD/Producto/List.jsx"

import DetalleProveedor from "../CRUD/Proveedor/DetalleProveedor.jsx"
import ActualizarProveedor from "../CRUD/Proveedor/ActualizarProveedor.jsx"
import AgregarProveedor from "../CRUD/Proveedor/AgregarProveedor.jsx"

import DetalleProducto from "../CRUD/Producto/DetalleProducto.jsx"


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
        <Navbar/>
        <Router>
          <Routes>
            <Route path="/" element={<Principal/>} />
            <Route path="/administrar-marcas" element={<MarcasAdmin/>} />

            <Route path="/administrar-proveedores" element={<ProveedorAdmin/>} />
            <Route path="/DetalleProveedor/:idProveedor" element={<DetalleProveedor/>} />
            <Route path="/ActualizarProveedor/:idProveedor" element={<ActualizarProveedor/>} />
            <Route path="/AgregarProveedor" element={<AgregarProveedor/>} />

            <Route path="/administrar-productos" element={<ProductoAdmin/>} />
            <Route path="/DetalleProducto/:idProducto" element={<DetalleProducto/>} />


          </Routes>
      </Router>
    </>
  )
}

export default App;