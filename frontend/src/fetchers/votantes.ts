import { headers } from './headers';

// Función para obtener la lista de votantes
export const getVotantes = async () => {
  try {
    const response = await fetch('http://localhost:20001/votantes', { method: 'GET', headers });
    if (!response.ok) {
      throw new Error('Error al obtener la lista de votantes.');
    }
    const data = await response.json();
    return data.votantes;  // Asumiendo que el backend devuelve un objeto con una propiedad 'votantes' que es un array.
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Función para agregar un nuevo votante
export const agregarVotante = async (nombre: string, rut: string) => {
  try {
    const response = await fetch(`http://localhost:20001/votantes/agregarVotante`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, rut })  // Usamos un cuerpo JSON en lugar de parámetros de URL.
    });

    if (!response.ok) {
      throw new Error('Error al agregar el votante.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
