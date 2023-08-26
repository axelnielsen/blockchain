import { ethers, network } from "hardhat";

async function main() {
  // Dirección del contrato implementado (actualiza con la dirección correcta)
  const contractAddress = "0xDD82324Acee3583f1263D02620dDc50495107512";

  // Obtén el contrato
  const Elecciones = await ethers.getContractFactory("Elecciones");
  const elecciones = Elecciones.attach(contractAddress);
/*
  // Agrega un candidato
  const agregarCandidatoTx = await elecciones.agregarCandidato("Gonzalo Arce ");
  await agregarCandidatoTx.wait();
  console.log("Candidato 'Gonzalo Arce' agregado.");
*/
  // Vota por el candidato con ID 0
  const votarTx = await elecciones.votar(4);
  await votarTx.wait();
  console.log("Votado por el candidato con ID 4.");

  const nombre = await elecciones.getNombre(4);
  const votos = await elecciones.getVotos(4);
  console.log(`Candidato: ${nombre}, Votos: ${votos}`);
}

// Ejecuta el script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
