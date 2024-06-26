// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Clientes from './Clientes'; // Asegúrate de tener la ruta correcta a tu componente Clientes
import Productos from './Productos'; // Asegúrate de tener la ruta correcta a tu componente Productos
import Pedidos from './Pedidos'; // Asegúrate de tener la ruta correcta a tu componente Pedidos
import Navbar from './Navbar'; // Asegúrate de tener la ruta correcta a tu componente Navbar

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Renderiza el componente Navbar */}
        
        <Routes>
          <Route path="/" element={<Navigate to="/clientes" />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/pedidos" element={<Pedidos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
