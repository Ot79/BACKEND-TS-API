import express from 'express';
import userRoutes from './routes/user.routes';
import { connectDB } from './config/mongo';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRoutes);

connectDB(); // Conectar a la base de datos MongoDB

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
