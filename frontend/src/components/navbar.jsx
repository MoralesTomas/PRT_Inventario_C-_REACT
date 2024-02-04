import './navbar.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


const Navbar = () => {

  // Retorna el navbar con el logo y los links a las funciones de administrador y reportes

  return (
    <div className="navbar">
      <div className="left">
        <img src="https://i.imgur.com/lpWtoN4.png" alt="Logo" className="logo" />
      </div>
      <h1 className="title">INVENTARIO</h1>
      <div className="buttons">
        <a href="/" className="button">
          Menu inicial
        </a>
        <a href="/Reportes" className="button">
          Reportes
        </a>
      </div>
    </div>
  );

};

export default Navbar;