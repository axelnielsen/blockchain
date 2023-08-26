import { useEffect, useState } from 'react';
import { agregarVotante, getVotantes } from '../fetchers/votantes';  // Importa las funciones de votantes

export const AgregarVotante = () => {
  const [nombreVotante, setNombreVotante] = useState('');
  const [rutVotante, setRutVotante] = useState('');  // Estado para el RUT
  const [listaVotantesDisplay, setListaVotantesDisplay] = useState<string[]>([]);  // Estado para el listado de votantes
  const [error, setError] = useState<string | null>(null);

  const cargarVotantes = async () => {
    try {
      const votantes = await getVotantes();
      if (Array.isArray(votantes)) {
        setListaVotantesDisplay(votantes.map(v => `${v.nombreCompleto} - ${v.rut}`));
      } else {
        setError('Error: listaVotantes no devolvió un array');
      }
    } catch (err) {
      setError( 'Error al cargar los votantes.');
    }
  };

  const handleAgregarVotante = async () => {
    try {
      await agregarVotante(nombreVotante, rutVotante);
      cargarVotantes();  // Recarga el listado de votantes después de agregar uno nuevo
    } catch (err) {
      setError( 'Error al agregar el votante.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        margin: 'auto',
        gap: '10px'
      }}
    >
      <input
        placeholder="Nombre del Votante"
        value={nombreVotante}
        onChange={(e) => setNombreVotante(e.currentTarget.value)}
      />
      <input
        placeholder="RUT del Votante"
        value={rutVotante}
        onChange={(e) => setRutVotante(e.currentTarget.value)}
      />
      <button onClick={handleAgregarVotante}>Agregar Votante</button>

      {/* Renderizar el listado de votantes */}
      <div>
        <h2>Listado de Votantes</h2>
        {error ? (
          // Si hay un error, mostrar el mensaje de error
          <div style={{ color: 'red' }}>
            <p>Ocurrió un error al cargar la lista de votantes:</p>
            <p>{error}</p>
          </div>
        ) : (
          // Si no hay errores, mostrar la lista de votantes
          <ul>
            {listaVotantesDisplay.map((votante, index) => (
              <li key={index}>{votante}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
