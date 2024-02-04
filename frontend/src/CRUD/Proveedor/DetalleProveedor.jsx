import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import serverUrl from '../../ServerConfig';

const DetalleProveedor = () => {
    const { idProveedor } = useParams();
    const [proveedor, setProveedor] = useState(null);

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

        if (idProveedor) {
            getProveedorById();
        }
    }, [idProveedor]);

    if (!proveedor) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            <h1>Detalles del Proveedor</h1>
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
