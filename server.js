const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./server/config/bd');
const categoriaRoutes = require('./server/routes/categoria.routes');
const productoRoutes = require('./server/routes/producto.routes');
const usuarioRoutes = require('./server/routes/usuario.routes')
const tipo_usuarioRoutes = require('./server/routes/tipoUsuario.routes');
const transaccionRoutes = require('./server/routes/transaccion.routes');

const app = express();

// Middleware
app.use(cors());  // Configurar CORS
app.use(bodyParser.json());  // Analizar solicitudes JSON
app.use(bodyParser.urlencoded({ extended: true }));  // Analizar solicitudes URL codificadas

// Conexión a la base de datos
dbConfig
  .authenticate()
  .then(() => console.log('Conexión a la base de datos establecida.'))
  .catch((error) => console.error('No se pudo conectar a la base de datos:', error));

// Rutas
app.use('/api/categorias/', categoriaRoutes);

app.use('/api/productos/', productoRoutes);

app.use('/api/usuarios', usuarioRoutes);

app.use('/api/tipoUsuario', tipo_usuarioRoutes);

app.use('/api/transaccion', transaccionRoutes);


// Prueba navegador
app.get("/", (req, res) => {
  res.json({ message: "Welcome to IVI application." });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


