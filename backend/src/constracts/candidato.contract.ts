import { ethers } from 'ethers';
import { Elecciones__factory } from '../../../blockchain/typechain/factories/Elecciones__factory';
import { BlockchainUrlsEnum } from './urls';
import dotenv from 'dotenv';
dotenv.config();

export const getCandidatoContract = (
  url: BlockchainUrlsEnum = BlockchainUrlsEnum.POLYGON_MUMBAI
) => {
  const provider = new ethers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  return new ethers.Contract(
    process.env.ELECCIONES_CONTRACT_ADDRESS!,
    Elecciones__factory.abi,
    wallet
  );
};

// Suponiendo que quieras agregar funciones para interactuar con los métodos específicos del contrato "Candidato":

export const getNombre = async (contractInstance: ethers.Contract) => {
  return await contractInstance.getNombre();
};

export const getVotos = async (contractInstance: ethers.Contract) => {
  return await contractInstance.getVotos();
};

export const votar = async (contractInstance: ethers.Contract) => {
  const tx = await contractInstance.votar();
  return await tx.wait();
};