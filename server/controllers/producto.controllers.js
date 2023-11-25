const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const crearProducto = async (req, res) => {
    const { id_categoria, nombre_producto, precio_total_producto, tamanio_producto, 
        imagen_producto ,descripcion_producto, stok_actual_producto, stok_min_producto, precio_inicial_producto,
        margen_producto} = req.body;
    
    const idProducto = await obtenerUltimoID();
    const codProducto = crearCodigoProducto(idProducto, nombre_producto);
    

    try {
        const nuevoProducto = await Producto.create({
            id_producto: idProducto,
            id_categoria,
            nombre_producto,
            precio_total_producto,
            tamanio_producto, 
            imagen_producto,
            descripcion_producto,
            stok_actual_producto,
            stok_min_producto,
            precio_inicial_producto,
            margen_producto,
            cod_producto: codProducto,
        });
        // Formatea la fecha de creación antes de enviarla en la respuesta
        const fechaCreacion = new Date(nuevoProducto.fecha_creacion);
        const fechaModificacion = new Date(nuevoProducto.fecha_modificacion);
        const productoFormateado = {
            ...nuevoProducto.toJSON(),
            fecha_creacion: fechaCreacion.toLocaleString(),
            fecha_modificacion: fechaModificacion.toLocaleString(),
        };
        console.log("Producto enviado", productoFormateado);
        return res.status(201).json({ mensaje: 'Producto creado exitosamente', producto: productoFormateado });
    } catch (error) {
        console.error('Error al crear Producto:', error);
        return res.status(500).json({ error: 'Error al crear Producto', message: error.message });
    }
}

async function obtenerUltimoID () {
    try {
        const resultado = await Producto.max('id_producto');
        return resultado+1 || 0; // Si no hay productos, devuelve 0
    } catch (error) {
        console.error('Error al obtener el último ID de producto:', error);
        throw error;
    }
}

function crearCodigoProducto(idProducto, nombre_producto) {
    // Formatea el id_producto a un formato de dos dígitos, por ejemplo, "01" en lugar de "1"
    const idFormateado = String(idProducto).padStart(2, '0');
    
    // Convierte el nombre del producto a mayúsculas y toma las primeras tres letras
    const nombreFormateado = nombre_producto.slice(0, 3).toUpperCase();
    
    // Combina el nombre formateado y el id formateado
    const codigoProducto = `${nombreFormateado}-${idFormateado}`;
    
    return codigoProducto; 
}

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: Categoria,
            order: [
                ['fecha_modificacion', 'DESC'],
            ],            
        });

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
            const fechaModificacion = producto.fecha_modificacion ? new Date(producto.fecha_modificacion) : null; // Convierte a Date si no es null
            
            return {
                ...producto.toJSON(),
                fecha_creacion: fechaCreacion.toLocaleString('es-ES', options),  // Formatea la fecha
                fecha_modificacion: fechaModificacion ? fechaModificacion.toLocaleString('es-ES', options) : null, // Formatea si no es null
                nombre_categoria: producto.Categorium ? producto.Categorium.nombre_categoria : null, // Obtiene solo el nombre_categoria
            };
        });

        return res.json(productosFormateados);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return res.status(500).json({ error: 'Error al obtener productos', message: error.message });
    }
};

const obtenerProducto = async (req, res) => {
    const idProducto = req.params.id;
    try {
        const producto = await Producto.findByPk(idProducto, {
            include: Categoria
        });
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrada' });
        }
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        const fechaCreacion = new Date(producto.fecha_creacion);
        const fechaModificacion = producto.fecha_modificacion
            ? new Date(producto.fecha_modificacion)
            : null;

        const formattedProducto = {
            ...producto.toJSON(),
            fecha_creacion: fechaCreacion.toLocaleString('es-ES', options),
            fecha_modificacion: fechaModificacion ? fechaModificacion.toLocaleString('es-ES', options): null,
            nombre_categoria: producto.Categorium ? producto.Categorium.nombre_categoria : null,
        };
        
        return res.status(200).json(formattedProducto);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const modificarProducto = async (req, res) => {
    const idProducto = req.params.id;
    const { 
        id_categoria,
        nombre_producto,
        precio_total_producto,
        tamanio_producto, 
        imagen_producto,
        descripcion_producto,
        stok_actual_producto,
        stok_min_producto,
        precio_inicial_producto,
        margen_producto
    } = req.body;

    try {
        const productoModificado = await Producto.findByPk(idProducto);

        // Verificar exitencia
        if (!productoModificado) {
            return res.status(404).json({ error: 'Producto no encontrada' });
        }

        // Actualizar el producto con los nuevos datos
        await productoModificado.update({
            id_categoria,
            nombre_producto,
            precio_total_producto,
            tamanio_producto, 
            imagen_producto,
            descripcion_producto,
            stok_actual_producto,
            stok_min_producto,
            precio_inicial_producto,
            margen_producto
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

module.exports = { crearProducto , obtenerProductos, modificarProducto, eliminarProducto, obtenerProducto };