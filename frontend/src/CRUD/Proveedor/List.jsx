import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';  
import serverUrl from '../../ServerConfig';
import axios from 'axios'

import '../List.css'

const ProveedorAdmin = () => {

    const [proveedores, setProveedor] = useState([])

    useEffect(() => {
        const getElements = async () => {

            try {
                const api = `${serverUrl}/proveedor`
                const response = await axios.get(api)
                setProveedor(response.data)
            } catch (error) {
                console.log(error.response.data)
                alert('Error al hacer la peticion get')
                return;
            }

        }
        getElements();
    }, [])


    return (
        <>
        <h1>Listado de Proveedores</h1>
        
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
                                <Link to={`/DeleteProveedor/${proveedor.idProveedor}`} className="btn btn-danger btn-sm ml-2">
                                    Eliminar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
    );
};

export default ProveedorAdmin;
