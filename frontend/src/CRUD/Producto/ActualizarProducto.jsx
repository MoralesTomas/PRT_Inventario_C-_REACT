import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import serverUrl from '../../ServerConfig';

const ActualizarProducto = () => {
    const { idProducto } = useParams();
    const [producto, setProducto] = useState(null);
    const [marcas, setMarcas] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [presentaciones, setPresentaciones] = useState([]);
    const [zonas, setZonas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productoApi = `${serverUrl}/producto/${idProducto}`;
                const marcasApi = `${serverUrl}/marca`;
                const proveedoresApi = `${serverUrl}/proveedor`;
                const presentacionesApi = `${serverUrl}/presentacion`;
                const zonasApi = `${serverUrl}/zona`;

                const [productoResponse, marcasResponse, proveedoresResponse, presentacionesResponse, zonasResponse] = await Promise.all([
                    axios.get(productoApi),
                    axios.get(marcasApi),
                    axios.get(proveedoresApi),
                    axios.get(presentacionesApi),
                    axios.get(zonasApi),
                ]);

                setProducto(productoResponse.data);
                setMarcas(marcasResponse.data);
                setProveedores(proveedoresResponse.data);
                setPresentaciones(presentacionesResponse.data);
                setZonas(zonasResponse.data);
            } catch (error) {
                console.log(error.response.data);
                alert('Error al obtener los detalles del producto');
            }
        };

        if (idProducto) {
            fetchData();
        }
    }, [idProducto]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleUpdateProducto = async () => {
        try {
            const updateApi = `${serverUrl}/producto/actualizar`;
            await axios.put(updateApi, {
                ...producto,
                idMarca: parseInt(producto.idMarca),
                idPresentacion: parseInt(producto.idPresentacion),
                idProveedor: parseInt(producto.idProveedor),
                idZona: parseInt(producto.idZona),
            });
            alert('Producto actualizado correctamente');
            window.location.href = "/administrar-productos";
        } catch (error) {
            console.log(error.response);
            alert('Error al actualizar el producto');
        }
    };

    if (!producto) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            <h1 style={{ marginLeft: '1rem' }}>Editar Producto</h1>
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
                                    value={producto.codigo}
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
                                    value={producto.descripcionProducto}
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
                                    value={producto.precio}
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
                                    value={producto.stock}
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
                                    value={producto.iva}
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
                                    value={producto.peso}
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
                                    value={producto.activo ? 'true' : 'false'}
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
                                    value={producto.idMarca}
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
                                    value={producto.idProveedor}
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
                                    value={producto.idPresentacion}
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
                                    value={producto.idZona}
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
                    
                    <button type="button" className="btn btn-success" onClick={handleUpdateProducto}>
                        Actualizar Producto
                    </button>
                </form>
            </div>
            <br />
            <br />
        </>
    );
};

export default ActualizarProducto;
