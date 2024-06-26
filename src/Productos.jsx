// src/components/Productos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productos.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = () => {
    axios.get('http://localhost:5000/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los productos:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProducto = {
      nombre: nombre,
      precio: precio,
      stock: stock,
    };

    axios.post('http://localhost:5000/productos', newProducto)
      .then(response => {
        console.log('Producto agregado:', response.data);
        fetchProductos(); // Volver a cargar la lista de productos
        setNombre(''); // Limpiar el formulario
        setPrecio(''); // Limpiar el formulario
        setStock(''); // Limpiar el formulario
      })
      .catch(error => {
        console.error('Hubo un error al agregar el producto:', error);
      });
  };

  return (
    <>
      <main className='productos-container'>
        <h1>Lista de Productos</h1>
        <ul className='productos-items'>
          {productos.map(producto => (
            <li className='item' key={producto.id}>
              <span><strong>Nombre: </strong>{producto.nombre}</span><br />
              <span><strong>Precio: </strong>{producto.precio}</span><br />
              <span><strong>Stock: </strong>{producto.stock}</span><br />
            </li>
          ))}
        </ul>
      </main>

      <footer>
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </li>
            <li>
              <label htmlFor="precio">Precio:</label>
              <input
                type="text"
                id="precio"
                name="precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
            </li>
            <li>
              <label htmlFor="stock">Stock:</label>
              <input
                type="text"
                id="stock"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
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

export default Productos;
