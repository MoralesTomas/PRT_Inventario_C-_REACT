import React, { useState } from "react";
import axios from 'axios';
import serverUrl from '../../ServerConfig'; // importar la url del servidor desde el archivo de configuracion
import { useNavigate } from "react-router-dom";

const AgregarProveedor = () => {
    // Hooks para manejar el estado del proveedor
    const [descripcion, setDescripcion] = useState("");
    const [activo, setActivo] = useState(false);

    const navigate = useNavigate();

    // Funcion para agregar un proveedor
    const handleAgregarProveedor = async () => {
        try {
            const api = `${serverUrl}/proveedor/agregar`;
            const body = { "descripcion": descripcion, "activo": activo };

            await axios.post(api, body); // Peticion POST para agregar un proveedor

            alert('Proveedor agregado correctamente');
            navigate('/administrar-proveedores'); // Redirigir a la lista de proveedores
        } catch (error) {
            console.log(error.response.data);
            alert('Error al agregar el proveedor');
        }
    };

    // Formulario para agregar un proveedor
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
                        <button type="button" className="btn btn-success" onClick={handleAgregarProveedor}>
                            Agregar Proveedor
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AgregarProveedor;
