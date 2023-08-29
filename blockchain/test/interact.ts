import { ethers, network } from "hardhat";

async function main() {
  // Dirección del contrato implementado (actualiza con la dirección correcta)
  const contractAddress = "0xDD82324Acee3583f1263D02620dDc50495107512";

  // Obtén el contrato
  const Elecciones = await ethers.getContractFactory("Elecciones");
  const elecciones = Elecciones.attach(contractAddress);
/* 
  // Agrega un candidato
  const agregarCandidatoTx = await elecciones.agregarCandidato("Candidato 9");
  await agregarCandidatoTx.wait();
  console.log("Candidato 'Gonzalo Arce' agregado.");
*/
  // Vota por el candidato con ID 0
  const votarTx = await elecciones.votar(5);
  await votarTx.wait();
  console.log("Votado por el candidato con ID 5.");

  const nombre = await elecciones.getNombre(5);
  const votos = await elecciones.getVotos(5);
  console.log(`Candidato: ${nombre}, Votos: ${votos}`);
  
}

// Ejecuta el script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
