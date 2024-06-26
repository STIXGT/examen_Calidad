// src/components/Nav.js
import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'; // Importa estilos CSS del componente Nav

const Nav = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Clientes</Link>
        </li>
        <li className="nav-item">
          <Link to="/productos" className="nav-link">Productos</Link>
        </li>
        <li className="nav-item">
          <Link to="/pedidos" className="nav-link">Pedidos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
