import { headers } from './headers';

// Función para obtener la lista de candidatos
export const getCandidatos = async () =>
  await fetch('http://localhost:20001/elecciones/candidatos', { method: 'GET', headers }).then((response) =>
    response.json()
  );

// Función para agregar un nuevo candidato
export const agregarCandidato = async (nombre: string) =>
  await fetch(`http://localhost:20001/elecciones/agregarCandidato/?nombre=${nombre}`, {
    method: 'POST',
    headers
  }).then((response) => response.json());
