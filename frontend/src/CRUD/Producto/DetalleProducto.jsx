import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import serverUrl from '../../ServerConfig';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



const DetalleProducto = () => {
    const { idProducto } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        const getProductoById = async () => {
            try {
                const api = `${serverUrl}/producto/${idProducto}`;
                const response = await axios.get(api);
                setProducto(response.data);
            } catch (error) {
                console.log(error.response.data);
                alert('Error al obtener los detalles del producto');
            }
        };

        if (idProducto) {
            getProductoById();
        }
    }, [idProducto]);

    if (!producto) {
        return <p>Cargando...</p>;
    }


    const exportToPDF = () => {
        const pdfDoc = new jsPDF();
        pdfDoc.text(20, 20, 'Detalles del Producto');

        // Extracted data from the product object
        const data = [
            ['ID:', `${producto.idProducto}`],
            ['Descripción:', `${producto.descripcionProducto}`],
            ['Código:', `${producto.codigo}`],
            ['Precio:', `${producto.precio}`],
            ['Stock:', `${producto.stock}`],
            ['IVA:', `${producto.iva}`],
            ['Peso:', `${producto.peso}`],
            ['Activo:', `${producto.activo ? 'Sí' : 'No'}`],
            ['Marca:', `${producto.marca.descripcion}`],
            ['Presentación:', `${producto.presentacion.descripcion}`],
            ['Proveedor:', `${producto.proveedor.descripcion}`],
            ['Zona:', `${producto.zona.descripcion}`],
        ];

        pdfDoc.autoTable({
            head: [['Atributo', 'Valor']],
            body: data,
            startY: 30,
        });

        pdfDoc.save(`Detalles_Producto_${producto.idProducto}.pdf`);
    };

    return (
        <>
            <h1 style={{ marginLeft: '1rem' }} >Detalles del Producto</h1>
            <div className="container mt-4">
                <table className="table table-bordered border-primary">
                    <tbody>
                        <tr>
                            <th>ID:</th>
                            <td>{producto.idProducto}</td>
                        </tr>
                        <tr>
                            <th>Descripción:</th>
                            <td>{producto.descripcionProducto}</td>
                        </tr>
                        <tr>
                            <th>Código:</th>
                            <td>{producto.codigo}</td>
                        </tr>
                        <tr>
                            <th>Precio:</th>
                            <td>{producto.precio}</td>
                        </tr>
                        <tr>
                            <th>Stock:</th>
                            <td>{producto.stock}</td>
                        </tr>
                        <tr>
                            <th>IVA:</th>
                            <td>{producto.iva}</td>
                        </tr>
                        <tr>
                            <th>Peso:</th>
                            <td>{producto.peso}</td>
                        </tr>
                        <tr>
                            <th>Activo:</th>
                            <td>{producto.activo ? 'Sí' : 'No'}</td>
                        </tr>
                        <tr>
                            <th>Marca:</th>
                            <td>{producto.marca.descripcion}</td>
                        </tr>
                        <tr>
                            <th>Presentación:</th>
                            <td>{producto.presentacion.descripcion}</td>
                        </tr>
                        <tr>
                            <th>Proveedor:</th>
                            <td>{producto.proveedor.descripcion}</td>
                        </tr>
                        <tr>
                            <th>Zona:</th>
                            <td>{producto.zona.descripcion}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <a href="/administrar-productos" className="btn btn-primary" style={{ marginLeft: '1rem' }}>
                Regresar
            </a>
            <button className="btn btn-primary" onClick={exportToPDF} style={{ marginRight: '1rem' }}>
                Exportar a PDF
            </button>
            <br />
            <br />
        </>
    );
};

export default DetalleProducto;
