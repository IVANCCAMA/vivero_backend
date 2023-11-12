const TipoTransaccion = require('../models/tipoTransaccion');

    
    const obtenerTipoTransaccion = async (req, res) => {
        try {
        const transacciones = await TipoTransaccion.findAll({ 
            attributes: ['id_tipo_transaccion', 'tipo_transaccion'], 
        });
        return res.json(transacciones);
        } catch (error) {
        console.error('Error al obtener tipo transacciones:', error);
        return res.status(500).json({ error: 'Error al obtener tipo transacciones', message: error.message });
        }
    };

        const obtenerTipoTransaccionid = async (req, res) => {
    const idTipoTransaccion = req.params.id;
    try {
        const tipo_Transaccion = await TipoTransaccion.findByPk(idTipoTransaccion);
        if (!tipo_Transaccion) {
        return res.status(404).json({ error: 'TipoTransaccion no encontrada' });
        }
        res.status(200).json(tipo_Transaccion);
    } catch (error) {
        console.error('Error al obtener Tipo Transaccion:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    };

module.exports = {obtenerTipoTransaccion,obtenerTipoTransaccionid };
