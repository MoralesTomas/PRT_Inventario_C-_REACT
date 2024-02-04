import './Menus.css';
import 'bootstrap/dist/css/bootstrap.css';


const Menus = () => {

    return (
        <>

<div className="row mx-auto">

    <div className="col-sm-6">
        <div className="card text-white bg-dark">
            <div className="card-header">
                Administrar
            </div>
            <div className="card-body">
                <h5 className="card-title">Administrar productos</h5>
                <p className="card-text">Acceso a visualizar, editar, eliminar, agregar en los elementos del tipo producto</p>
                <a href="/administrar-productos" className="btn btn-primary">Ir a la función</a>
            </div>
        </div>
    </div>

    <div className="col-sm-6">
        <div className="card text-white bg-dark">
            <div className="card-header">
                Administrar
            </div>
            <div className="card-body">
                <h5 className="card-title">Administrar marcas</h5>
                <p className="card-text">Acceso a visualizar, editar, eliminar, agregar en los elementos del tipo marca</p>
                <a href="/administrar-marcas" className="btn btn-primary">Ir a la función</a>
            </div>
        </div>
    </div>
    
</div>

<br/>
<br/>

<div className="row mx-auto">

    <div className="col-sm-6">
        <div className="card text-white bg-dark">
            <div className="card-header">
                Administrar
            </div>
            <div className="card-body">
                <h5 className="card-title">Administrar proveedores</h5>
                <p className="card-text">Acceso a visualizar, editar, eliminar, agregar en los elementos del tipo proveedor</p>
                <a href="/administrar-proveedores" className="btn btn-primary">Ir a la función</a>
            </div>
        </div>
    </div>

    <div className="col-sm-6">
        <div className="card text-white bg-dark">
            <div className="card-header">
                Administrar
            </div>
            <div className="card-body">
                <h5 className="card-title">Administrar presentaciones</h5>
                <p className="card-text">Acceso a visualizar, editar, eliminar, agregar en los elementos del tipo presentacion</p>
                <a href="/Administrador/Details" className="btn btn-primary">Ir a la función</a>
            </div>
        </div>
    </div>
    
</div>

<br/>
<br/>

<div className="row mx-auto">

    <div className="col-sm-6">
        <div className="card text-white bg-dark">
            <div className="card-header">
                Administrar
            </div>
            <div className="card-body">
                <h5 className="card-title">Administrar zonas</h5>
                <p className="card-text">Acceso a visualizar, editar, eliminar, agregar en los elementos del tipo zona</p>
                <a href="/Administrador/Details" className="btn btn-primary">Ir a la función</a>
            </div>
        </div>
    </div>

    <div className="col-sm-6">
        <div className="card text-white bg-dark">
            <div className="card-header">
                Administrar
            </div>
            <div className="card-body">
                <h5 className="card-title">Informacion</h5>
                <p className="card-text">Informacion del desarrollador </p>
                <a href="https://www.linkedin.com/in/tomas-morales-s/" className="btn btn-primary pl-2" target="_blank">LinkedIn</a>
                <a href="https://linktr.ee/moralestomas" className="btn btn-primary pl-2" target="_blank">Linktr</a>
                <a href="https://github.com/MoralesTomas" className="btn btn-primary pl-2" target="_blank">GitHub</a>
            </div>
        </div>
    </div>
    
</div>

<br/>
<br/>

        </>
    );

};

export default Menus;