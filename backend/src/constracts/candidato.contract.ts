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

export const votar = async (idCandidato: number) => {
  
  try {
    console.log("ahora viene getCandidatoContract:");
    const contract = getCandidatoContract();
    console.log("En contrato:"+idCandidato);
    const tx = await contract.votar(idCandidato);
    return await tx.wait();
  } catch (error) {
    console.log('Error al votar:', error);
    throw error;
  }
};