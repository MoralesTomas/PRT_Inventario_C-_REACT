import React, { useState, useEffect } from "react";
import axios from 'axios';
import serverUrl from '../../ServerConfig';

const AgregarProducto = () => {
    const [nuevoProducto, setNuevoProducto] = useState({
        codigo: "",
        descripcionProducto: "",
        precio: 0,
        stock: 0,
        iva: 0,
        peso: 0,
        activo: true,
        idMarca: 0,
        idProveedor: 0,
        idPresentacion: 0,
        idZona: 0,
    });

    const [marcas, setMarcas] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [presentaciones, setPresentaciones] = useState([]);
    const [zonas, setZonas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const marcasApi = `${serverUrl}/marca`;
                const proveedoresApi = `${serverUrl}/proveedor`;
                const presentacionesApi = `${serverUrl}/presentacion`;
                const zonasApi = `${serverUrl}/zona`;

                const [marcasResponse, proveedoresResponse, presentacionesResponse, zonasResponse] = await Promise.all([
                    axios.get(marcasApi),
                    axios.get(proveedoresApi),
                    axios.get(presentacionesApi),
                    axios.get(zonasApi),
                ]);

                setMarcas(marcasResponse.data);
                setProveedores(proveedoresResponse.data);
                setPresentaciones(presentacionesResponse.data);
                setZonas(zonasResponse.data);
            } catch (error) {
                console.log(error.response.data);
                alert('Error al obtener datos para agregar producto');
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    const handleAgregarProducto = async () => {
        try {
            const agregarApi = `${serverUrl}/producto/agregar`;
            await axios.post(agregarApi, {
                ...nuevoProducto,
                idMarca: parseInt(nuevoProducto.idMarca),
                idPresentacion: parseInt(nuevoProducto.idPresentacion),
                idProveedor: parseInt(nuevoProducto.idProveedor),
                idZona: parseInt(nuevoProducto.idZona),
            });
            alert('Producto agregado correctamente');
            window.location.href = "/administrar-productos";
        } catch (error) {
            console.log(error.response);
            alert('Error al agregar el producto');
        }
    };

    return (
        <>
            <h1 style={{ marginLeft: '1rem' }}>Agregar Nuevo Producto</h1>
            <div className="container mt-4">
                <form>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="codigo">Código:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="codigo"
                                    name="codigo"
                                    value={nuevoProducto.codigo}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="descripcionProducto">Descripción:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="descripcionProducto"
                                    name="descripcionProducto"
                                    value={nuevoProducto.descripcionProducto}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="precio">Precio:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="precio"
                                    name="precio"
                                    value={nuevoProducto.precio}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="stock">Stock:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="stock"
                                    name="stock"
                                    value={nuevoProducto.stock}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="iva">IVA:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="iva"
                                    name="iva"
                                    value={nuevoProducto.iva}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="peso">Peso:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="peso"
                                    name="peso"
                                    value={nuevoProducto.peso}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="activo">Activo:</label>
                                <select
                                    className="form-control"
                                    id="activo"
                                    name="activo"
                                    value={nuevoProducto.activo ? 'true' : 'false'}
                                    onChange={handleInputChange}
                                >
                                    <option value="true">Sí</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="marca">Marca:</label>
                                <select
                                    className="form-control"
                                    id="marca"
                                    name="idMarca"
                                    value={nuevoProducto.idMarca}
                                    onChange={handleInputChange}
                                >
                                    {marcas.map(marca => (
                                        <option key={marca.idMarca} value={marca.idMarca}>
                                            {marca.descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="proveedor">Proveedor:</label>
                                <select
                                    className="form-control"
                                    id="proveedor"
                                    name="idProveedor"
                                    value={nuevoProducto.idProveedor}
                                    onChange={handleInputChange}
                                >
                                    {proveedores.map(proveedor => (
                                        <option key={proveedor.idProveedor} value={proveedor.idProveedor}>
                                            {proveedor.descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="presentacion">Presentación:</label>
                                <select
                                    className="form-control"
                                    id="presentacion"
                                    name="idPresentacion"
                                    value={nuevoProducto.idPresentacion}
                                    onChange={handleInputChange}
                                >
                                    {presentaciones.map(presentacion => (
                                        <option key={presentacion.idPresentacion} value={presentacion.idPresentacion}>
                                            {presentacion.descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="zona">Zona:</label>
                                <select
                                    className="form-control"
                                    id="zona"
                                    name="idZona"
                                    value={nuevoProducto.idZona}
                                    onChange={handleInputChange}
                                >
                                    {zonas.map(zona => (
                                        <option key={zona.idZona} value={zona.idZona}>
                                            {zona.descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <br />

                    <a href="/administrar-productos" className="btn btn-primary" >
                        Regresar
                    </a>

                    <button type="button" className="btn btn-success" onClick={handleAgregarProducto}>
                        Agregar Producto
                    </button>
                </form>
            </div>
            <br />
            <br />
        </>
    );
};

export default AgregarProducto;
