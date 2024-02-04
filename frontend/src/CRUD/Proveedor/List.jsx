import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import serverUrl from '../../ServerConfig'; // importar la url del servidor desde el archivo de configuracion

import '../List.css';

const ProveedorAdmin = () => {
    // Hook para manejar el estado de los proveedores
    const [proveedores, setProveedor] = useState([]);

    // Peticion GET para obtener los proveedores
    useEffect(() => {
        const getElements = async () => {
            try {
                const api = `${serverUrl}/proveedor`;
                const response = await axios.get(api);
                setProveedor(response.data);
            } catch (error) {
                console.log(error.response.data);
                alert('Error al hacer la petición GET');
            }
        };

        getElements();
    }, []);

    // Funcion para eliminar un proveedor
    const handleDeleteProveedor = async (idProveedor) => {
        const shouldDelete = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede revertir.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        });

        // Si el usuario confirma que desea eliminar el proveedor se realiza la peticion DELETE
        if (shouldDelete.isConfirmed) {
            try {
                const deleteApi = `${serverUrl}/proveedor/${idProveedor}`;
                await axios.delete(deleteApi);

                Swal.fire('Eliminado', 'El proveedor ha sido eliminado correctamente.', 'success');

                // Realiza la petición GET nuevamente para obtener los elementos actualizados
                const response = await axios.get(`${serverUrl}/proveedor`);
                setProveedor(response.data);
            } catch (error) {
                console.log(error.response.data);
                alert('Error al eliminar el proveedor');
            }
        }
    };

    // Retorna la tabla con los proveedores y los botones de opciones
    return (
        <>
            <h1 style={{ marginLeft: '1rem' }}>Listado de Proveedores</h1>

            <div className="ContScroll_min_des">
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Activo</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map(proveedor => (
                            <tr key={proveedor.idProveedor}>
                                <td>{proveedor.idProveedor}</td>
                                <td>{proveedor.descripcion}</td>
                                <td>{proveedor.activo ? 'Sí' : 'No'}</td>
                                <td>
                                    <Link to={`/DetalleProveedor/${proveedor.idProveedor}`} className="btn btn-secondary btn-sm ml-2">
                                        Detalles
                                    </Link>
                                    <Link to={`/ActualizarProveedor/${proveedor.idProveedor}`} className="btn btn-info btn-sm ml-2">
                                        Editar
                                    </Link>
                                    <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteProveedor(proveedor.idProveedor)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ textAlign: 'right' }}>
                <Link to={`/AgregarProveedor`} className="btn btn-success" style={{ marginRight: '3rem' }}>
                    Agregar
                </Link>
            </div>



        </>
    );
};

export default ProveedorAdmin;
