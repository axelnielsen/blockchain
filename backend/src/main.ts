import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { getMessengerContract } from './constracts/messenger.contract';

dotenv.config();

//let message='Welcome to the Web3 🚀'
const app: Express = express();
const port = process.env.PORT;

app.options('*', cors());

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
/*
app.get('/messenger', async (req: Request, res: Response) => {
  res.json({
    message
  });
});

app.put('/messenger', async (req: Request, res: Response) => {
  message=req.query.message! as string;
  res.json({
    message
  });
});
*/

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

app.listen(port, () => {
  console.log(`⚡️[server]: DApp API Server is running at http://localhost:${port}`);
});
