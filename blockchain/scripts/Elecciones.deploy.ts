// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const Elecciones = await hre.ethers.getContractFactory("Elecciones");
  const elecciones = await Elecciones.deploy();

  console.log("Contrato Elecciones implementado en:", elecciones.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
