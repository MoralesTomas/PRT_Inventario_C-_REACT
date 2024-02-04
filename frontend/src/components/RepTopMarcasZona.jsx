import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import serverUrl from '../ServerConfig';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const RepTopMarcasZona = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = `${serverUrl}/reporte/top-marcas-zona`;
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

        data.forEach(zona => {
            if (zona.topMarcas.length > 0) {
                pdf.autoTable({
                    head: [
                        [
                            {
                                content: zona.descripCionZona,
                                colSpan: 3,
                                styles: { halign: 'center', fillColor: [64, 64, 64] },
                            },
                        ],
                        ["Marca", "ID Marca", "Cantidad de Productos"],
                    ],
                    body: zona.topMarcas.map(topMarca => [
                        topMarca.descripcionMarca,
                        topMarca.idMarca,
                        topMarca.cantidadProductos,
                    ]),
                    startY: pdf.autoTableEndPosY() + 10,
                });
            } else {
                pdf.autoTable({
                    head: [
                        [
                            {
                                content: zona.descripCionZona,
                                colSpan: 3,
                                styles: { halign: 'center', fillColor: [64, 64, 64] },
                            },
                        ],
                        ["No hay marcas principales para esta zona."],
                    ],
                });
            }
        });

        pdf.save("Top_Marcas_Zona.pdf");
    };

    return (
        <div>
            <h1 style={{ marginLeft: '1rem' }}>Top Marcas por Zona</h1>
            <div className="ContScroll_min_des">
                {data.map(zona => (
                    <table className="table table-dark table-hover" key={zona.idZona}>
                        <thead>
                            <tr>
                                <th colSpan="3">{zona.descripCionZona}</th>
                            </tr>
                            <tr>
                                <th>Marca</th>
                                <th>ID Marca</th>
                                <th>Cantidad de Productos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {zona.topMarcas.length > 0 ? (
                                zona.topMarcas.map(topMarca => (
                                    <tr key={topMarca.idMarca}>
                                        <td>{topMarca.descripcionMarca}</td>
                                        <td>{topMarca.idMarca}</td>
                                        <td>{topMarca.cantidadProductos}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No hay marcas principales para esta zona.</td>
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

export default RepTopMarcasZona;
