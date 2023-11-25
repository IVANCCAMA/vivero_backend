const TipoTransaccion = require('../models/tipoTransaccion');
const Transaccion = require('../models/transaccion');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

const CrearTransaccion = async (req, res) => {
    const { id_tipo_transaccion, id_producto, id_usuario, cantidad_ingreso, cantidad_salida, detalle_transaccion,
        } = req.body;

    try {
        const nuevaTransaccion = await Transaccion.create({
            id_tipo_transaccion,
            id_producto ,
            id_usuario,
            cantidad_ingreso,
            cantidad_salida,
            detalle_transaccion,
        });
        // Formatea la fecha de creación antes de enviarla en la respuesta
        const fechaCreacion = new Date(nuevaTransaccion.fecha_transaccion);
        const transaccionFormateado = {
            ...nuevaTransaccion.toJSON(),
            fecha_transaccion: fechaCreacion.toLocaleString()
        };
        
        return res.status(201).json({ mensaje: 'Transaccion creado exitosamente', transaccion: transaccionFormateado });
    } catch (error) {
        console.error('Error al crear Transaccion:', error);
        return res.status(500).json({ error: 'Error al crear Transaccion', message: error.message });
    }
}

const obtenerTransacciones = async (req, res) => {
    try {
        const transacciones = await Transaccion.findAll({
            include: [
                { model: TipoTransaccion },
                { model: Producto },
                { model: Usuario },
            ],
            order: [
                ['fecha_transaccion', 'DESC'],
            ],
        });

        // Formatea las fechas antes de enviarlas en la respuesta
        const transaccionesFormateados = transacciones.map(transaccion => {
            const options = { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
            };

            const fechaCreacion = new Date(transaccion.fecha_transaccion); // Convierte a Date
            // se tendra fecha de moidificacion?
            const fechaModificacion = transaccion.fecha_modificacion ? new Date(transaccion.fecha_modificacion) : null; // Convierte a Date si no es null
            return {
                ...transaccion.toJSON(),
                fecha_transaccion: fechaCreacion.toLocaleString('es-ES', options),  // Formatea la fecha a tu preferencia
                fecha_modificacion: fechaModificacion ? fechaModificacion.toLocaleString('es-ES', options) : null, // Formatea si no es null
                tipo_transaccion: transaccion.TipoTransaccion ? transaccion.TipoTransaccion.tipo_transaccion : null,
                nombre_producto: transaccion.Producto ? transaccion.Producto.nombre_producto : null,
                nombre_usuario: transaccion.Usuario ? transaccion.Usuario.nombre_usuario: null,
            };
        });

        return res.json(transaccionesFormateados);
    } catch (error) {
        console.error('Error al obtener transacciones:', error);
        return res.status(500).json({ error: 'Error al obtener transacciones', message: error.message });
    }
};

const obtenerTransaccion = async (req, res) => {
    const idTransaccion = req.params.id;
    try {
        const transaccion = await Transaccion.findByPk(idTransaccion, {
            include: [
                { model: TipoTransaccion },
                { model: Producto },
                { model: Usuario },
            ],
        });
        if (!transaccion) {
            return res.status(404).json({ error: 'Transaccion no encontrado' });
        }
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        const fechaCreacion = new Date(transaccion.fecha_transaccion);
        const fechaModificacion = transaccion.fecha_modificacion
            ? new Date(transaccion.fecha_modificacion)
            : null;

        const transaccionFormateado = {
            ...transaccion.toJSON(),
            fecha_transaccion: fechaCreacion.toLocaleString('es-ES', options),
            fecha_modificacion: fechaModificacion ? fechaModificacion.toLocaleString('es-ES', options): null,
                tipo_transaccion: transaccion.TipoTransaccion ? transaccion.TipoTransaccion.tipo_transaccion : null,
                nombre_producto: transaccion.Producto ? transaccion.Producto.nombre_producto : null,
                nombre_usuario: transaccion.Usuario ? transaccion.Usuario.nombre_usuario: null,
            };

        res.status(200).json(transaccionFormateado);
    } catch (error) {
        console.error('Error al obtener la transaccion:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const modificarTransaccion = async (req, res) => {
    const idTransaccion = req.params.id;
    const {
        id_tipo_transaccion,
        id_producto,
        id_usuario,
        cantidad_ingreso,
        cantidad_salida, 
        detalle_transaccion
    } = req.body;

    try {
        const transaccionModificado = await Transaccion.findByPk(idTransaccion);

        // Verificar exitencia
        if (!transaccionModificado) {
            return res.status(404).json({ error: 'Transaccion no encontrado' });
        }

        // Actualizar el transaccion con los nuevos datos
        await transaccionModificado.update({
            id_tipo_transaccion,
            id_producto,
            id_usuario,
            cantidad_ingreso,
            cantidad_salida, 
            detalle_transaccion
        });

    return res.status(200).json({ message: 'Transaccion modificada exitosamente', tipo_transaccion: transaccionModificado });
    } catch (error) {
        console.error('Error al modificar transaccion:', error);
        return res.status(500).json({ error: 'Error al modificar transaccion', message: error.message });
    }
};

const eliminarTransaccion = async (req, res) => {
    const idTransaccion = req.params.id;

    try {
        const transaccionEliminada = await Transaccion.findByPk(idTransaccion);
    
        // Verificar existencia
        if (!transaccionEliminada) {
            return res.status(404).json({ error: 'Transaccion no encontrada' });
        }
    
        // Eliminar la Transaccion
        await transaccionEliminada.destroy();
    
        return res.status(200).json({ mensaje: 'Transaccion eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar Transaccion:', error);
        return res.status(500).json({ error: 'Error al eliminar Transaccion', message: error.message });
    }
};

module.exports = { CrearTransaccion , obtenerTransacciones, modificarTransaccion, eliminarTransaccion, obtenerTransaccion };