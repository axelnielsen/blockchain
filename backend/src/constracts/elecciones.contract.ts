// elecciones.js
import { ethers } from 'ethers';
import { Elecciones__factory } from '../../../blockchain/typechain/factories/Elecciones__factory';
import { BlockchainUrlsEnum } from './urls';
import dotenv from 'dotenv';

dotenv.config();

// Esta función devuelve la instancia del contrato Elecciones.
const getEleccionesContract = () => {
  const provider = new ethers.JsonRpcProvider(BlockchainUrlsEnum.POLYGON_MUMBAI);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  return new ethers.Contract(
    process.env.ELECCIONES_CONTRACT_ADDRESS!,
    Elecciones__factory.abi,
    wallet
  );
};

// Si necesitas una función similar para otro contrato, por ejemplo, Candidato, puedes agregarla aquí:
/*
const getCandidatoContract = () => {
  const provider = new ethers.JsonRpcProvider(BlockchainUrlsEnum.POLYGON_MUMBAI);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  return new ethers.Contract(
    process.env.CANDIDATO_CONTRACT_ADDRESS!,
    Candidato__factory.abi,
    wallet
  );
};
*/

export const getNombre = async () => {
  const contract = getEleccionesContract();
  return await contract.getNombre();
};

export const getVotos = async () => {
  const contract = getEleccionesContract();
  return await contract.getVotos();
};

export const votar = async (idCandidato: number) => {
  try {
    const contract = getEleccionesContract();
    const tx = await contract.votar(idCandidato);
    return await tx.wait();
  } catch (error) {
    console.error('Error al votar:', error);
    throw error;
  }
};
