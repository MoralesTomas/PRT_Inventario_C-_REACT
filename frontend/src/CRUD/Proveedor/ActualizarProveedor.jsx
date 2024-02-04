import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import serverUrl from '../../ServerConfig'; // importar la url del servidor desde el archivo de configuracion

const ActualizarProveedor = () => {
    // Obtener el id del proveedor de los parametros de la URL
    const { idProveedor } = useParams();
    // Hooks para manejar el estado del proveedor
    const [descripcion, setDescripcion] = useState("");
    const [activo, setActivo] = useState(false);

    const navigate = useNavigate();

    // Peticion GET para obtener el proveedor por su id
    useEffect(() => {
        const getProveedorById = async () => {
            try {
                const api = `${serverUrl}/proveedor/${idProveedor}`;
                const response = await axios.get(api);
                setDescripcion(response.data.descripcion);
                setActivo(response.data.activo);
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

    // Funcion para actualizar los datos del proveedor
    const handleActualizar = async () => {
        try {
            const api = `${serverUrl}/proveedor/actualizar`;
            const body = { "idProveedor": idProveedor, "descripcion": descripcion, "activo": activo };

            await axios.put(api, body);

            alert('Datos actualizados correctamente');
            navigate('/administrar-proveedores'); // Redirigir a la lista de proveedores
        } catch (error) {
            console.log(error.response.data);
            alert('Error al actualizar los datos del proveedor');
        }
    };

    // Formulario para actualizar los datos del proveedor
    return (
        <div className="container mt-4">
            <form>
                <div className="row mb-3">
                    <label htmlFor="descripcion" className="col-sm-2 col-form-label">Descripción:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="activo" className="col-sm-2 col-form-label">Activo:</label>
                    <div className="col-sm-10">
                        <select className="form-select" id="activo" value={activo} onChange={(e) => setActivo(e.target.value === 'true')}>
                            <option value={true}>Sí</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-10 offset-sm-2">
                        <a href="/administrar-proveedores" className="btn btn-primary" style={{ marginLeft: '1rem' }}>
                            Regresar
                        </a>
                        <button type="button" className="btn btn-success" onClick={handleActualizar}>
                            Actualizar Datos
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ActualizarProveedor;
