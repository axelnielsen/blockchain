import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { Votantes__factory } from '../../../blockchain/typechain/factories/Votantes__factory';
import { BlockchainUrlsEnum } from './urls';

dotenv.config();

export const getVotantesContract = (
  url: BlockchainUrlsEnum = BlockchainUrlsEnum.POLYGON_MUMBAI
) => {
  const provider = new ethers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  return new ethers.Contract(
    process.env.VOTANTES_CONTRACT_ADDRESS!,
    Votantes__factory.abi,
    wallet
  );
};

// Suponiendo que quieras agregar funciones para interactuar con los métodos específicos del contrato "Votantes":

export const registrarVotante = async (nombreCompleto: string, rut: string, contractInstance: ethers.Contract) => {
  const tx = await contractInstance.registrarVotante(nombreCompleto, rut);
  return await tx.wait();
};

export const obtenerVotante = async (direccion: string, contractInstance: ethers.Contract) => {
  return await contractInstance.obtenerVotante(direccion);
};

export const totalVotantes = async (contractInstance: ethers.Contract) => {
  return await contractInstance.totalVotantes();
};
