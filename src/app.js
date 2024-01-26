import express from 'express';
import usuariosRutas from './routes/usuarios.routes.js';


const app = express()

app.use(express.json());
app.use('/api', usuariosRutas);

export default app;
