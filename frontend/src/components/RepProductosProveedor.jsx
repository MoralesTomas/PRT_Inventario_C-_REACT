import React, { useEffect, useState } from "react";
import axios from 'axios';
import serverUrl from '../ServerConfig';
import { Link } from 'react-router-dom';

const ProductosPorProveedor = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = `${serverUrl}/reporte/productos-proveedor`;
                const response = await axios.get(api);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1 style={{ marginLeft: '1rem' }}>Listado de Productos por Proveedor</h1>
            <div className="ContScroll_min_des">
                {data.map(proveedor => (
                    <table className="table table-dark table-hover" key={proveedor.idProveedor}>
                        <thead>
                            <tr>
                                <th colSpan="11">{proveedor.descripcion}</th>
                            </tr>
                            <tr>
                                <th>Producto</th>
                                <th>ID</th>
                                <th>Código</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>IVA</th>
                                <th>Peso</th>
                                <th>Activo</th>
                                <th>Marca</th>
                                <th>Presentación</th>
                                <th>Zona</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proveedor.productos.length > 0 ? (
                                proveedor.productos.map(producto => (
                                    <tr key={producto.idProducto}>
                                        <td>{producto.descripcionProducto}</td>
                                        <td>{producto.idProducto}</td>
                                        <td>{producto.codigo}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.stock}</td>
                                        <td>{producto.iva}</td>
                                        <td>{producto.peso}</td>
                                        <td>{producto.activo ? 'Sí' : 'No'}</td>
                                        <td>{producto.marca.descripcion}</td>
                                        <td>{producto.presentacion.descripcion}</td>
                                        <td>{producto.zona.descripcion}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11">No hay productos disponibles para este proveedor.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                ))}
            </div>
            <div style={{ textAlign: 'right' }}>
                <button className="btn btn-success" style={{ marginRight: '3rem' }} >
                    Exportar a PDF
                </button>
                <Link to={`/Reportes`} className="btn btn-success" style={{ marginRight: '3rem' }}>
                    Regresar
                </Link>
            </div>
        </div>
    );
};

export default ProductosPorProveedor;
