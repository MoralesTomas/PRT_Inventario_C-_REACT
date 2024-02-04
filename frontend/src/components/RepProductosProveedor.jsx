import React, { useEffect, useState } from "react";
import axios from 'axios';
import serverUrl from '../ServerConfig';

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
            {data.map(proveedor => (
                <div key={proveedor.idProveedor}>
                    <h2>{proveedor.descripcion}</h2>
                    {proveedor.productos.length > 0 ? (
                        <ul>
                            {proveedor.productos.map(producto => (
                                <li key={producto.idProducto}>
                                    <strong>{producto.descripcionProducto}</strong>
                                    <ul>
                                        <li>ID: {producto.idProducto}</li>
                                        <li>Código: {producto.codigo}</li>
                                        <li>Precio: {producto.precio}</li>
                                        {/* Add more details as needed */}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay productos disponibles para este proveedor.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProductosPorProveedor;
