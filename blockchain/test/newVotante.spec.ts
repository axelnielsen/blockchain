import { ethers, network } from "hardhat";

async function main() {
  // Dirección del contrato implementado (actualiza con la dirección correcta)
  const contractAddress = "0x93BA651617eaD5Bb98df1C2fdeAf6bc8C8e592b5";

  // Obtén el contrato
  const Votantes = await ethers.getContractFactory("Votantes");
  const votantes = Votantes.attach(contractAddress);

  // Agrega un votante
  const nombreVotante = "Juan Pérez";
  const rutVotante = "12345678-9";
  const agregarVotanteTx = await votantes.registrarVotante(nombreVotante, rutVotante);
  await agregarVotanteTx.wait();
  console.log(`Votante '${nombreVotante}' con RUT '${rutVotante}' agregado.`);

  // Si necesitas realizar alguna otra acción con el votante o consultar datos, puedes hacerlo aquí.

}

// Ejecuta el script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
