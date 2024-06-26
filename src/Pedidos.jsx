// src/components/Pedidos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pedidos.css';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [fechaPedido, setFechaPedido] = useState('');

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = () => {
    axios.get('http://localhost:5000/pedidos')
      .then(response => {
        setPedidos(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los pedidos:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPedido = {
      cliente_id: clienteId,
      fecha_pedido: fechaPedido,
    };

    axios.post('http://localhost:5000/pedidos', newPedido)
      .then(response => {
        console.log('Pedido agregado:', response.data);
        fetchPedidos(); // Volver a cargar la lista de pedidos
        setClienteId(''); // Limpiar el formulario
        setFechaPedido(''); // Limpiar el formulario
      })
      .catch(error => {
        console.error('Hubo un error al agregar el pedido:', error);
      });
  };

  return (
    <>
      <main className='pedidos-container'>
        <h1>Lista de Pedidos</h1>
        <ul className='pedidos-items'>
          {pedidos.map(pedido => (
            <li className='item' key={pedido.id}>
              <span><strong>ID Cliente: </strong>{pedido.cliente_id}</span><br />
              <span><strong>Fecha Pedido: </strong>{pedido.fecha_pedido}</span><br />
            </li>
          ))}
        </ul>
      </main>

      <footer>
        <h2>Agregar Pedido</h2>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label htmlFor="clienteId">ID Cliente:</label>
              <input
                type="text"
                id="clienteId"
                name="clienteId"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                required
              />
            </li>
            <li>
              <label htmlFor="fechaPedido">Fecha Pedido:</label>
              <input
                type="date"
                id="fechaPedido"
                name="fechaPedido"
                value={fechaPedido}
                onChange={(e) => setFechaPedido(e.target.value)}
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

export default Pedidos;
