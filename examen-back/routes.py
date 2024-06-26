# routes.py
from flask import jsonify, request

def init_routes(app, mysql):
    
    # Endpoints para Productos
    @app.route('/productos', methods=['GET'])
    def get_productos():
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Productos")
        rows = cur.fetchall()
        return jsonify(rows)

    @app.route('/productos', methods=['POST'])
    def add_producto():
        data = request.get_json()
        if 'nombre' not in data or 'precio' not in data or 'stock' not in data:
            return jsonify({"error": "Nombre, precio y stock son campos requeridos"}), 400
        
        nombre = data.get('nombre')
        precio = data.get('precio')
        stock = data.get('stock')

        cur = mysql.connection.cursor()
        try:
            cur.execute("INSERT INTO Productos (nombre, precio, stock) VALUES (%s, %s, %s)", (nombre, precio, stock))
            mysql.connection.commit()
            return jsonify({"message": "Producto agregado exitosamente"}), 201
        except Exception as e:
            return jsonify({"error": f"No se pudo agregar el producto: {str(e)}"}), 500
        finally:
            cur.close()

    @app.route('/productos/<int:id>', methods=['PUT'])
    def update_producto(id):
        data = request.get_json()
        nombre = data.get('nombre')
        precio = data.get('precio')
        stock = data.get('stock')

        cur = mysql.connection.cursor()
        try:
            cur.execute("UPDATE Productos SET nombre=%s, precio=%s, stock=%s WHERE id=%s", (nombre, precio, stock, id))
            mysql.connection.commit()
            return jsonify({"message": "Producto actualizado exitosamente"})
        except Exception as e:
            return jsonify({"error": f"No se pudo actualizar el producto: {str(e)}"}), 500
        finally:
            cur.close()

    @app.route('/productos/<int:id>', methods=['DELETE'])
    def delete_producto(id):
        cur = mysql.connection.cursor()
        try:
            cur.execute("DELETE FROM Productos WHERE id=%s", (id,))
            mysql.connection.commit()
            return jsonify({"message": "Producto eliminado exitosamente"})
        except Exception as e:
            return jsonify({"error": f"No se pudo eliminar el producto: {str(e)}"}), 500
        finally:
            cur.close()

    # Endpoints para Clientes
    @app.route('/clientes', methods=['GET'])
    def get_clientes():
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Clientes")
        rows = cur.fetchall()
        return jsonify(rows)

    @app.route('/clientes', methods=['POST'])
    def add_cliente():
        data = request.get_json()
        if 'nombre' not in data or 'email' not in data:
            return jsonify({"error": "Nombre y correo electrónico son campos requeridos"}), 400
        
        nombre = data.get('nombre')
        email = data.get('email')

        cur = mysql.connection.cursor()
        try:
            cur.execute("INSERT INTO Clientes (nombre, email) VALUES (%s, %s)", (nombre, email))
            mysql.connection.commit()
            return jsonify({"message": "Cliente agregado exitosamente"}), 201
        except Exception as e:
            return jsonify({"error": f"No se pudo agregar el cliente: {str(e)}"}), 500
        finally:
            cur.close()

    @app.route('/clientes/<int:id>', methods=['PUT'])
    def update_cliente(id):
        data = request.get_json()
        nombre = data.get('nombre')
        email = data.get('email')

        cur = mysql.connection.cursor()
        try:
            cur.execute("UPDATE Clientes SET nombre=%s, email=%s WHERE id=%s", (nombre, email, id))
            mysql.connection.commit()
            return jsonify({"message": "Cliente actualizado exitosamente"})
        except Exception as e:
            return jsonify({"error": f"No se pudo actualizar el cliente: {str(e)}"}), 500
        finally:
            cur.close()

    @app.route('/clientes/<int:id>', methods=['DELETE'])
    def delete_cliente(id):
        cur = mysql.connection.cursor()
        try:
            cur.execute("DELETE FROM Clientes WHERE id=%s", (id,))
            mysql.connection.commit()
            return jsonify({"message": "Cliente eliminado exitosamente"})
        except Exception as e:
            return jsonify({"error": f"No se pudo eliminar el cliente: {str(e)}"}), 500
        finally:
            cur.close()

    # Endpoints para Pedidos
    @app.route('/pedidos', methods=['GET'])
    def get_pedidos():
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Pedidos")
        rows = cur.fetchall()
        return jsonify(rows)

    @app.route('/pedidos', methods=['POST'])
    def add_pedido():
        data = request.get_json()
        if 'cliente_id' not in data or 'fecha_pedido' not in data:
            return jsonify({"error": "cliente_id y fecha_pedido son campos requeridos"}), 400
        
        cliente_id = data.get('cliente_id')
        fecha_pedido = data.get('fecha_pedido')

        cur = mysql.connection.cursor()
        try:
            cur.execute("INSERT INTO Pedidos (cliente_id, fecha_pedido) VALUES (%s, %s)", (cliente_id, fecha_pedido))
            mysql.connection.commit()
            return jsonify({"message": "Pedido agregado exitosamente"}), 201
        except Exception as e:
            return jsonify({"error": f"No se pudo agregar el pedido: {str(e)}"}), 500
        finally:
            cur.close()

    @app.route('/pedidos/<int:id>', methods=['PUT'])
    def update_pedido(id):
        data = request.get_json()
        cliente_id = data.get('cliente_id')
        fecha_pedido = data.get('fecha_pedido')

        cur = mysql.connection.cursor()
        try:
            cur.execute("UPDATE Pedidos SET cliente_id=%s, fecha_pedido=%s WHERE id=%s", (cliente_id, fecha_pedido, id))
            mysql.connection.commit()
            return jsonify({"message": "Pedido actualizado exitosamente"})
        except Exception as e:
            return jsonify({"error": f"No se pudo actualizar el pedido: {str(e)}"}), 500
        finally:
            cur.close()

    @app.route('/pedidos/<int:id>', methods=['DELETE'])
    def delete_pedido(id):
        cur = mysql.connection.cursor()
        try:
            cur.execute("DELETE FROM Pedidos WHERE id=%s", (id,))
            mysql.connection.commit()
            return jsonify({"message": "Pedido eliminado exitosamente"})
        except Exception as e:
            return jsonify({"error": f"No se pudo eliminar el pedido: {str(e)}"}), 500
        finally:
            cur.close()
