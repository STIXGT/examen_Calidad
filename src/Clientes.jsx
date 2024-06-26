// src/components/Clientes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cliente.css';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    axios.get('http://localhost:5000/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los clientes:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCliente = {
      nombre: name,
      email: email,
    };

    axios.post('http://localhost:5000/clientes', newCliente)
      .then(response => {
        console.log('Cliente agregado:', response.data);
        fetchClientes(); // Volver a cargar la lista de clientes
        setName(''); // Limpiar el formulario
        setEmail(''); // Limpiar el formulario
      })
      .catch(error => {
        console.error('Hubo un error al agregar el cliente:', error);
      });
  };

  return (
    <>
      <main className='client-container'>
        <h1>Lista de Clientes</h1>
        <ul className='client-items'>
          {clientes.map(cliente => (
            <li className='item' key={cliente.id}>
              <span><strong>Cliente: </strong>{cliente.nombre}</span><br />
              <span><strong>Correo: </strong>{cliente.email}</span><br />
            </li>
          ))}
        </ul>
      </main>

      <footer>
        <h2>Agregar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="user_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </li>
            <li>
              <label htmlFor="mail">Correo:</label>
              <input
                type="email"
                id="mail"
                name="user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </li>
          </ul>
          <button type="submit">Agregar</button>
        </form>
      </footer>
    </>
  );
};

export default Clientes;
