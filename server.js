import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { authenticate } from './server/config/bd';
import categoriaRoutes from './server/routes/categoria.routes';
import productoRoutes from './server/routes/producto.routes';
import usuarioRoutes from './server/routes/usuario.routes';
import tipo_usuarioRoutes from './server/routes/tipoUsuario.routes';
import transaccionRoutes from './server/routes/transaccion.routes';
import tipo_transaccionRoutes from './server/routes/tipoTransaccion.routes';
import authRoute  from "./server/routes/auth.routes";


const app = express();

// Middleware
app.use(cors());  // Configurar CORS
app.use(json());  // Analizar solicitudes JSON
app.use(urlencoded({ extended: true }));  // Analizar solicitudes URL codificadas

// Conexión a la base de datos
authenticate()
  .then(() => console.log('Conexión a la base de datos establecida.'))
  .catch((error) => console.error('No se pudo conectar a la base de datos:', error));

// Rutas
app.use('/api/categorias/', categoriaRoutes);

app.use('/api/productos/', productoRoutes);

app.use('/api/usuarios', usuarioRoutes);

app.use('/api/tipoUsuario', tipo_usuarioRoutes);

app.use('/api/transaccion', transaccionRoutes);

app.use('/api/tipotransaccion', tipo_transaccionRoutes);

app.use('/api/auth', authRoute)


// Prueba navegador
app.get("/", (req, res) => {
  res.json({ message: "Welcome to IVI application." });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


