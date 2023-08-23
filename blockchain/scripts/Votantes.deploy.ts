import { ethers } from "hardhat";

async function main() {
  // Obtén el contrato
  const Votantes = await ethers.getContractFactory("Votantes");
  
  // Implementa el contrato
  const votantes = await Votantes.deploy();
  await votantes.deployed();

  console.log("Contrato Votantes implementado en:", votantes.address);
}

// Ejecuta el script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
