import { sign, verify } from 'jsonwebtoken';

const crypto = require('crypto');

const generateSecureKey = () => {
    const lengthInBytes = 32; // 256 bits
    return crypto.randomBytes(lengthInBytes).toString('hex');
};

const secretKey = generateSecureKey();
console.log('Clave secreta segura:', secretKey);// Reemplaza esto con una clave secreta más segura

const login = async (req, res) => {
    const { username, password } = req.body;

    // Ejemplo de verificación básica, reemplázalo con tu lógica de autenticación real
    if (username === 'usuario' && password === 'contraseña') {
        const token = sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
    }
};

const protectedResource = async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        res.json({ mensaje: 'Bienvenido al recurso protegido', usuario: decoded.username });
    });
};

module.exports = { login, protectedResource };
