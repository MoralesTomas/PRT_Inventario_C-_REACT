import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import serverUrl from '../../ServerConfig';

const ActualizarProveedor = () => {
    const { idProveedor } = useParams();
    const [descripcion, setDescripcion] = useState("");
    const [activo, setActivo] = useState(false);

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

        if (idProveedor) {
            getProveedorById();
        }
    }, [idProveedor]);

    const handleActualizar = async () => {
        try {
            const api = `${serverUrl}/proveedor/actualizar`;
            const body = {"idProveedor":idProveedor,"descripcion": descripcion, "activo": activo};
            await axios.put(api, body);
            alert('Datos actualizados correctamente');
        } catch (error) {
            console.log(error.response.data);
            alert('Error al actualizar los datos del proveedor');
        }
    };

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
