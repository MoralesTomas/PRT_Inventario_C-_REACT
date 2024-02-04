import './Menus.css'; // Importa el archivo de estilos CSS
import 'bootstrap/dist/css/bootstrap.css';


const Reports = () => {

    return (
        <>

<div className="row mx-auto">

    <div className="col-sm-6">
        <div className="card text-white bg-dark">
            <div className="card-header">
                Reporte
            </div>
            <div className="card-body">
                <h5 className="card-title">Productos por proveedor</h5>
                <p className="card-text">Podra visualizar/exportar un reporte general de todos los productos filtrados por su proveedor</p>
                <a href="/administrar-productos" className="btn btn-primary">Ir a la función</a>
            </div>
        </div>
    </div>

    <div className="col-sm-6">
        <div className="card text-white bg-dark">
            <div className="card-header">
                Reporte
            </div>
            <div className="card-body">
                <h5 className="card-title">Top marcas por zona</h5>
                <p className="card-text">Podra visualizar/exportar un reporte general de marcas segun las zonas, esto en base a productos. </p>
                <a href="/administrar-marcas" className="btn btn-primary">Ir a la función</a>
            </div>
        </div>
    </div>
    
</div>

<br/>
<br/>

        </>
    );

};

export default Reports;