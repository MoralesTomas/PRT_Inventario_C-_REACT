import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import serverUrl from '../ServerConfig';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ProductosPorProveedor = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = `${serverUrl}/reporte/productos-proveedor`;
                const response = await axios.get(api);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const exportToPDF = () => {
        const pdf = new jsPDF();

        data.forEach(proveedor => {
            // Check if there are products for the provider
            if (proveedor.productos.length > 0) {
                pdf.autoTable({
                    head: [
                        [
                            {
                                content: proveedor.descripcion,
                                colSpan: 11,
                                styles: { halign: 'center', fillColor: [64, 64, 64] },
                            },
                        ],
                        [
                            { content: "Producto", styles: { cellWidth: 'wrap' } },
                            { content: "ID", styles: { cellWidth: 'wrap' } },
                            { content: "Código", styles: { cellWidth: 'wrap' } },
                            { content: "Precio", styles: { cellWidth: 'wrap' } },
                            { content: "Stock", styles: { cellWidth: 'wrap' } },
                            { content: "IVA", styles: { cellWidth: 'wrap' } },
                            { content: "Peso", styles: { cellWidth: 'wrap' } },
                            { content: "Activo", styles: { cellWidth: 'wrap' } },
                            { content: "Marca", styles: { cellWidth: 'wrap' } },
                            { content: "Presentación", styles: { cellWidth: 'wrap' } },
                            { content: "Zona", styles: { cellWidth: 'wrap' } },
                        ],
                    ],
                    body: proveedor.productos.map(producto => [
                        producto.descripcionProducto,
                        producto.idProducto,
                        producto.codigo,
                        producto.precio,
                        producto.stock,
                        producto.iva,
                        producto.peso,
                        producto.activo ? 'Sí' : 'No',
                        producto.marca.descripcion,
                        producto.presentacion.descripcion,
                        producto.zona.descripcion,
                    ]),
                    startY: pdf.autoTableEndPosY() + 10,
                });
            } else {
                // If no products, display a row with a message
                pdf.autoTable({
                    head: [
                        [
                            {
                                content: proveedor.descripcion,
                                colSpan: 11,
                                styles: { halign: 'center', fillColor: [64, 64, 64] },
                            },
                        ],
                        ["No hay productos disponibles para este proveedor."],
                    ],
                });
            }
        });

        pdf.save("Listado_Productos_Proveedor.pdf");
    };

    return (
        <div>
            <h1 style={{ marginLeft: '1rem' }}>Listado de Productos por Proveedor</h1>
            <div className="ContScroll_min_des">
                {data.map(proveedor => (
                    <table className="table table-dark table-hover" key={proveedor.idProveedor}>
                        <thead>
                            <tr>
                                <th colSpan="11">{proveedor.descripcion}</th>
                            </tr>
                            <tr>
                                <th>Producto</th>
                                <th>ID</th>
                                <th>Código</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>IVA</th>
                                <th>Peso</th>
                                <th>Activo</th>
                                <th>Marca</th>
                                <th>Presentación</th>
                                <th>Zona</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proveedor.productos.length > 0 ? (
                                proveedor.productos.map(producto => (
                                    <tr key={producto.idProducto}>
                                        <td>{producto.descripcionProducto}</td>
                                        <td>{producto.idProducto}</td>
                                        <td>{producto.codigo}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.stock}</td>
                                        <td>{producto.iva}</td>
                                        <td>{producto.peso}</td>
                                        <td>{producto.activo ? 'Sí' : 'No'}</td>
                                        <td>{producto.marca.descripcion}</td>
                                        <td>{producto.presentacion.descripcion}</td>
                                        <td>{producto.zona.descripcion}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11">No hay productos disponibles para este proveedor.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                ))}
            </div>
            <div style={{ textAlign: 'right' }}>
                <button className="btn btn-success" style={{ marginRight: '3rem' }} onClick={exportToPDF}>
                    Exportar a PDF
                </button>
                <Link to={`/Reportes`} className="btn btn-success" style={{ marginRight: '3rem' }}>
                    Regresar
                </Link>
            </div>
        </div>
    );
};

export default ProductosPorProveedor;
