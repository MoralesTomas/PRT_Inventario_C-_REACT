import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import serverUrl from '../../ServerConfig'; // Importar la url del servidor desde el archivo de configuracion

const DetalleProveedor = () => {
    // Obtener el id del proveedor de los parametros de la URL
    const { idProveedor } = useParams();
    // Hook para manejar el estado del proveedor
    const [proveedor, setProveedor] = useState(null);

    // Peticion GET para obtener el proveedor por su id
    useEffect(() => {
        const getProveedorById = async () => {
            try {
                const api = `${serverUrl}/proveedor/${idProveedor}`;
                const response = await axios.get(api);
                setProveedor(response.data);
            } catch (error) {
                console.log(error.response.data);
                alert('Error al obtener los detalles del proveedor');
            }
        };

        // Si hay un id de proveedor en los parametros de la URL se realiza la peticion GET
        if (idProveedor) {
            getProveedorById();
        }
    }, [idProveedor]);

    // Si no hay proveedor se muestra un mensaje de carga
    if (!proveedor) {
        return <p>Cargando...</p>;
    }

    // Retorna la tabla con los detalles del proveedor
    return (
        <>
            <h1 style={{ marginLeft: '1rem' }}>Detalles del Proveedor</h1>
            <div className="container mt-4">
                <table className="table table-bordered border-primary">
                    <tbody>
                        <tr>
                            <th>ID:</th>
                            <td>{proveedor.idProveedor}</td>
                        </tr>
                        <tr>
                            <th>Descripción:</th>
                            <td>{proveedor.descripcion}</td>
                        </tr>
                        <tr>
                            <th>Activo:</th>
                            <td>{proveedor.activo ? 'Sí' : 'No'}</td>
                        </tr>
                        {/* Agrega más filas según los detalles del proveedor */}
                    </tbody>
                </table>
            </div>
            <a href="/administrar-proveedores" className="btn btn-primary" style={{ marginLeft: '1rem' }}>
                Regresar
            </a>
        </>
    );
};

export default DetalleProveedor;
