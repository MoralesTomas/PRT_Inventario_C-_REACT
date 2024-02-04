import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';  
import Swal from 'sweetalert2';
import serverUrl from '../../ServerConfig';
import axios from 'axios';

import '../List.css';

const MarcasAdmin = () => {
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        const getElements = async () => {
            try {
                const api = `${serverUrl}/marca`;
                const response = await axios.get(api);
                setMarcas(response.data);
            } catch (error) {
                console.log(error.response?.data);
                alert('Error al hacer peticion get');
                return;
            }
        };

        getElements();
    }, []);


    const handleDeleteProveedor = async (idMarca) => {
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
                const deleteApi = `${serverUrl}/marca/${idMarca}`;
                await axios.delete(deleteApi);
                Swal.fire('Eliminado', 'La marca ha sido eliminado correctamente.', 'success');
                // Realiza la petición GET nuevamente para obtener los elementos actualizados
                const response = await axios.get(`${serverUrl}/marca`);
                setMarcas(response.data);
            } catch (error) {
                console.log(error);
                alert('Error al eliminar la marca');
            }
        }
    };

    return (
        <>
            <h1>Listado de Marcas</h1>
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
                        {marcas.map(marca => (
                            <tr key={marca.idMarca}>
                                <td>{marca.idMarca}</td>
                                <td>{marca.descripcion}</td>
                                <td>{marca.activo ? 'Sí' : 'No'}</td>
                                <td>
                                    <Link to={`/DetalleMarca/${marca.idMarca}`} className="btn btn-secondary btn-sm ml-2">
                                        Detalles
                                    </Link>
                                    <Link to={`/EditarMarca/${marca.idMarca}`} className="btn btn-info btn-sm ml-2">
                                        Editar
                                    </Link>
                                    <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteProveedor(marca.idMarca)}>
                                        Eliminar
                                    </button>
                                    <Link to={`/AgregarMarca/${marca.idMarca}`} className="btn btn-success btn-sm ml-2">
                                    Agregar
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

export default MarcasAdmin;
