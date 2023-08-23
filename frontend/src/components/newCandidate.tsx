import { useEffect, useState } from 'react';
import { agregarCandidato, getCandidatos } from '../fetchers/elecciones';

export const AgregarCandidato = () => {
  const [nombreCandidato, setNombreCandidato] = useState('');
  const [listaCandidatos, setListaCandidatos] = useState<string[]>([]); // Estado para el listado de candidatos

  const cargarCandidatos = async () => {
    const candidatos = await getCandidatos();
    setListaCandidatos(candidatos);
  };

  useEffect(() => {
    cargarCandidatos();
  }, []);

  const handleAgregarCandidato = async () => {
    await agregarCandidato(nombreCandidato);
    cargarCandidatos(); // Recarga el listado de candidatos después de agregar uno nuevo
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
        placeholder="Nombre del Candidato"
        value={nombreCandidato}
        onChange={(e) => setNombreCandidato(e.currentTarget.value)}
      />
      <button onClick={handleAgregarCandidato}>Agregar Candidato</button>

      {/* Renderizar el listado de candidatos */}
      <div>
        <h2>Listado de Candidatos</h2>
        <ul>
          {listaCandidatos.map((candidato, index) => (
            <li key={index}>{candidato}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

