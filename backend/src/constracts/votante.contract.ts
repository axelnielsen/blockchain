import { ethers } from 'ethers';
import { Votantes__factory } from '../../../blockchain/typechain/factories/Votantes__factory';  // Asegúrate de tener la definición del contrato en typechain
import { BlockchainUrlsEnum } from './urls';
import dotenv from 'dotenv';

dotenv.config();

// Función para obtener una instancia del contrato Votantes
export const getVotanteContract = (
  url: BlockchainUrlsEnum = BlockchainUrlsEnum.POLYGON_MUMBAI
) => {
  const provider = new ethers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  return new ethers.Contract(
    process.env.VOTANTES_CONTRACT_ADDRESS!,  // Asegúrate de tener esta variable de entorno configurada
    Votantes__factory.abi,
    wallet
  );
};

// Función para obtener el total de votantes registrados
export const totalVotantes = async (contractInstance: ethers.Contract) => {
  return await contractInstance.totalVotantes();
};

// Función para obtener la información de un votante por su RUT
export const obtenerVotante = async (contractInstance: ethers.Contract, rut: string) => {
  return await contractInstance.obtenerVotante(rut);
};

// Función para registrar un votante
export const registrarVotante = async (contractInstance: ethers.Contract, nombre: string, rut: string) => {
  const tx = await contractInstance.registrarVotante(nombre, rut);
  return await tx.wait();
};

// Función para obtener la lista completa de votantes
export const listaVotantes = async (contractInstance: ethers.Contract) => {
  const total = await totalVotantes(contractInstance);
  const votantesList = [];

  for (let i = 0; i < total.toNumber(); i++) {
    const rut = await contractInstance.listaRuts(i);
    const votante = await obtenerVotante(contractInstance, rut);
    votantesList.push({
      nombreCompleto: votante.nombreCompleto,
      rut: votante.rut
    });
  }

  return votantesList;
};
