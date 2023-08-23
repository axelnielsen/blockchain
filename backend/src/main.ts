import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { getMessengerContract } from './constracts/messenger.contract';
import { getCandidatoContract } from './constracts/candidato.contract';  // Importa la función para obtener el contrato de Elecciones

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 20001;  // Agregado un valor por defecto por si no se define PORT en .env

app.use(cors());  // Usar cors de esta manera es más simple y efectivo que con app.options y app.all

// Endpoints para Messenger
app.get('/messenger', async (req: Request, res: Response) => {
  const contract = getMessengerContract();
  const response = await contract.getMessage();
  res.json({
    message: response
  });
});

app.put('/messenger', async (req: Request, res: Response) => {
  const message = req.query.message;
  const contract = getMessengerContract();
  const response = await contract.setMessage(message);
  res.json({
    message: response
  });
});

// Endpoints para Elecciones
app.get('/elecciones/candidatos', async (req: Request, res: Response) => {
  const contract = getCandidatoContract();
  const totalCandidatosBN = await contract.totalCandidatos();
  const totalCandidatos = totalCandidatosBN;
  const candidatosList = []; 
  for (let i = 0; i < totalCandidatos; i++) {
    const nombre = await contract.getNombre(i);
    candidatosList.push(nombre);  // Agrega cada nombre al arreglo
  }
  res.json(candidatosList);
});

app.post('/elecciones/agregarCandidato', async (req: Request, res: Response) => {
  const nombre = req.query.nombre;
  const contract = getCandidatoContract();
  const tx = await contract.agregarCandidato(nombre);
  const receipt = await tx.wait();  // Espera a que la transacción se confirme
  if (receipt.status === 1) {
    res.json({
      success: true,
      message: 'Candidato agregado con éxito'
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Hubo un error al agregar el candidato'
    });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: DApp API Server is running at http://localhost:${port}`);
});
