import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database/connection';
import cartoesRoutes from './routes/cartoes.routes';
import dividasRoutes from './routes/dividas.routes'
import parcelasRoutes from './routes/parcelas.routes'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3333;

app.use('/cartoes', cartoesRoutes);
app.use('/dividas', dividasRoutes)
app.use('/parcelas', parcelasRoutes)

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
