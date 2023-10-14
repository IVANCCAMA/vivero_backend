const Producto = require('../models/producto');

const crearProducto = async (req, res) => {
    const { idCategoria, nombre, precio, tamanio, 
        imagen ,descripcion, stokActual, stokMinimo} = req.body;

    try {
        const nuevoProducto = await Producto.create({
            id_categoria: idCategoria,
            nombre_producto: nombre,
            precio_total_producto: precio,
            tamanio_producto: tamanio, 
            imagen_producto: imagen,
            descripcion_producto: descripcion,
            stok_actual_producto: stokActual,
            stok_min_producto: stokMinimo
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
            const fechaCreacion = new Date(producto.fecha_creacion); // Convierte a Date
            return {
                ...producto.toJSON(),
                fecha_creacion: fechaCreacion.toLocaleString()  // Formatea la fecha a tu preferencia
            };
        });

        return res.json(productosFormateados);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return res.status(500).json({ error: 'Error al obtener productos', message: error.message });
    }
};



module.exports = { crearProducto , obtenerProductos};