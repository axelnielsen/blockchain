import { ethers, network } from "hardhat";

async function main() {
  // Dirección del contrato implementado (actualiza con la dirección correcta)
  const contractAddress = "0x93BA651617eaD5Bb98df1C2fdeAf6bc8C8e592b5";

  // Obtén el contrato
  const Votantes = await ethers.getContractFactory("Votantes");
  const votantes = Votantes.attach(contractAddress);

  // Obtiene el total de votantes registrados
  const total = await votantes.totalVotantes();
  console.log(`Total de votantes registrados: ${total}`);

  // Itera y muestra la información de cada votante
  for (let i = 0; i < total.toNumber(); i++) {
    const rut = await votantes.listaRuts(i);
    const votante = await votantes.obtenerVotante(rut);
    console.log(`Votante ${i + 1}: ${votante.nombreCompleto}, RUT: ${votante.rut}`);
  }
}

// Ejecuta el script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
