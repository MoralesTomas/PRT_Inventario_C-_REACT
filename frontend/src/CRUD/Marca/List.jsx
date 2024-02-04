import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';  
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
                console.log(error.response.data);
                alert('Error al hacer peticion get');
                return;
            }
        };

        getElements();
    }, []);

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
                                    <Link to={`/DeleteMarca/${marca.idMarca}`} className="btn btn-danger btn-sm ml-2">
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

export default MarcasAdmin;
