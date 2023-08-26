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


export const getNombre = async (contractInstance: ethers.Contract) => {
  return await contractInstance.getNombre();
};

export const getVotos = async (contractInstance: ethers.Contract) => {
  return await contractInstance.getVotos();
};

export const votarPorCandidato = async (idCandidato: number) => {
  try {
    const contract = getCandidatoContract();
    const tx = await contract.votar(idCandidato);
    return await tx.wait();
  } catch (error) {
    console.error('Error al votar:', error);
    throw error;
  }
};