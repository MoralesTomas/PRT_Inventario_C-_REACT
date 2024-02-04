import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import serverUrl from '../../ServerConfig';

import '../List.css';

const ProductoAdmin = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const getElements = async () => {
            try {
                const api = `${serverUrl}/producto`;
                const response = await axios.get(api);
                setProductos(response.data);
            } catch (error) {
                console.log(error.response.data);
                alert('Error al hacer la petición GET');
            }
        };

        getElements();
    }, []);

    const handleDeleteProducto = async (idProducto) => {
        const shouldDelete = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede revertir.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        });

        if (shouldDelete.isConfirmed) {
            try {
                const deleteApi = `${serverUrl}/producto/${idProducto}`;
                await axios.delete(deleteApi);
                
                const response = await axios.get(`${serverUrl}/producto`);
                setProductos(response.data);
                
                Swal.fire('Eliminado', 'El producto ha sido eliminado correctamente.', 'success');
            } catch (error) {
                console.log(error.response);
                alert('Error al eliminar el producto');
            }
        }
    };

    return (
        <>
            <h1 style={{ marginLeft: '1rem' }}>Listado de Productos</h1>

            <div className="ContScroll_min_des">
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Activo</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Zona</th>
                            <th scope="col">Código</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.idProducto}>
                                <td>{producto.idProducto}</td>
                                <td>{producto.descripcionProducto}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.stock}</td>
                                <td>{producto.activo ? 'Sí' : 'No'}</td>
                                <td>{producto.marca.descripcion}</td>
                                <td>{producto.zona.descripcion}</td>
                                <td>{producto.codigo}</td>
                                <td>
                                    <Link to={`/DetalleProducto/${producto.idProducto}`} className="btn btn-secondary btn-sm ml-2">
                                        Detalles
                                    </Link>
                                    <Link to={`/ActualizarProducto/${producto.idProducto}`} className="btn btn-info btn-sm ml-2">
                                        Editar
                                    </Link>
                                    <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteProducto(producto.idProducto)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ textAlign: 'right' }}>
                <Link to={`/AgregarProducto`} className="btn btn-success" style={{ marginRight: '3rem' }}>
                    Agregar
                </Link>
            </div>
        </>
    );
};

export default ProductoAdmin;