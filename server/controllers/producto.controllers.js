 
const Producto = require('../models/producto');

const crearProducto = async (req, res) => {
    const { id_categoria, nombre_producto, precio_total_producto, tamanio_producto, 
        imagen_producto ,descripcion_producto, stok_actual_producto, stok_min_producto} = req.body;

    try {
        const nuevoProducto = await Producto.create({
            id_categoria,
            nombre_producto,
            precio_total_producto,
            tamanio_producto, 
            imagen_producto,
            descripcion_producto,
            stok_actual_producto,
            stok_min_producto
        });
        // Formatea la fecha de creación antes de enviarla en la respuesta
        const fechaCreacion = new Date(nuevoProducto.fecha_creacion);
        const productoFormateado = {
            ...nuevoProducto.toJSON(),
            fecha_creacion: fechaCreacion.toLocaleString()
        };
        
        return res.status(201).json({ mensaje: 'Producto creado exitosamente', producto: productoFormateado });
    } catch (error) {
        console.error('Error al crear Producto:', error);
        return res.status(500).json({ error: 'Error al crear Producto', message: error.message });
    }
}

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();

        // Formatea las fechas antes de enviarlas en la respuesta
        const productosFormateados = productos.map(producto => {
            const options = { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
            };

            const fechaCreacion = new Date(producto.fecha_creacion); // Convierte a Date
            const fechaModificacion = new Date(producto.fecha_modificacion); // Convierte a Date
            return {
                ...producto.toJSON(),
                fecha_creacion: fechaCreacion.toLocaleString('es-ES', options),  // Formatea la fecha a tu preferencia
                fecha_modificacion: fechaModificacion.toLocaleString('es-ES', options),
            };
        });

        return res.json(productosFormateados);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return res.status(500).json({ error: 'Error al obtener productos', message: error.message });
    }
};

const modificarProducto = async (req, res) => {
    const idProducto = req.params.id;
    const { 
        nombre_producto,
        precio_total_producto,
        tamanio_producto, 
        imagen_producto,
        descripcion_producto,
        stok_actual_producto,
        stok_min_producto
     } = req.body;
  
    try {
      const productoModificado = await Producto.findByPk(idProducto);
  
      // Verificar exitencia
      if (!productoModificado) {
        return res.status(404).json({ error: 'Producto no encontrada' });
      }
  
      // Actualizar el producto con los nuevos datos
      await productoModificado.update({
        nombre_producto,
        precio_total_producto,
        tamanio_producto, 
        imagen_producto,
        descripcion_producto,
        stok_actual_producto,
        stok_min_producto
      });
  
      return res.status(200).json({ message: 'Producto modificada exitosamente', categoria: productoModificado });
    } catch (error) {
      console.error('Error al modificar producto:', error);
      return res.status(500).json({ error: 'Error al modificar producto', message: error.message });
    }
};

const eliminarProducto = async (req, res) => {
    const idProducto = req.params.id;
  
    try {
      const productoEliminado = await Producto.findByPk(idProducto);
  
      // Verificar existencia
      if (!productoEliminado) {
        return res.status(404).json({ error: 'Producto no encontrada' });
      }
  
      // Eliminar la Producto
      await productoEliminado.destroy();
  
      return res.status(200).json({ mensaje: 'Producto eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar Producto:', error);
      return res.status(500).json({ error: 'Error al eliminar Producto', message: error.message });
    }
};



module.exports = { crearProducto , obtenerProductos, modificarProducto, eliminarProducto };