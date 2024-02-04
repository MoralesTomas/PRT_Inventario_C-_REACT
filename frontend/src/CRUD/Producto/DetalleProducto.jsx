import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import serverUrl from '../../ServerConfig'; // importar la url del servidor desde el archivo de configuracion
import jsPDF from 'jspdf';
import 'jspdf-autotable';



const DetalleProducto = () => {
    // Obtener el id del producto de los parametros de la URL
    const { idProducto } = useParams();
    // Hook para manejar el estado del producto
    const [producto, setProducto] = useState(null);

    // Peticion GET para obtener el producto por su id
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

        // Si hay un id de producto en los parametros de la URL se realiza la peticion GET
        if (idProducto) {
            getProductoById();
        }
    }, [idProducto]);

    // Si el producto no ha sido cargado se muestra un mensaje de carga
    if (!producto) {
        return <p>Cargando...</p>;
    }

    // Funcion para exportar los detalles del producto a un archivo PDF
    const exportToPDF = () => {
        const pdfDoc = new jsPDF();
        pdfDoc.text(20, 20, 'Detalles del Producto');

        // Crear un array con los atributos del producto
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

        // Crear la tabla en el PDF
        pdfDoc.autoTable({
            head: [['Atributo', 'Valor']],
            body: data,
            startY: 30,
        });

        pdfDoc.save(`Detalles_Producto_${producto.idProducto}.pdf`);
    };

    // Retorna la tabla con los detalles del producto y los botones de opciones
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
