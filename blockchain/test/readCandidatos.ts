import { ethers } from "hardhat";

async function main() {
  // Dirección del contrato implementado (actualiza con la dirección correcta)
  const contractAddress = "0xDD82324Acee3583f1263D02620dDc50495107512";

  // Obtén el contrato
  const Elecciones = await ethers.getContractFactory("Elecciones");
  const elecciones = Elecciones.attach(contractAddress);

  // Lee el total de candidatos
  const totalCandidatosBN = await elecciones.totalCandidatos();
  const totalCandidatos = totalCandidatosBN.toNumber();
  console.log(`Total de candidatos: ${totalCandidatos}`);

  // Itera y muestra los candidatos
  for (let i = 0; i < totalCandidatos; i++) {
    const nombre = await elecciones.getNombre(i);
    const votos = await elecciones.getVotos(i);
    console.log(`Candidato ${i}: ${nombre}, Votos: ${votos}`);
  }
}

// Ejecuta el script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
