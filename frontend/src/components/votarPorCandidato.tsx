import { useEffect, useState } from 'react';
import { votarPorCandidato, getCandidatos } from '../fetchers/elecciones';

export const VotarPorCandidato = () => {
  const [listaCandidatos, setListaCandidatos] = useState<string[]>([]);
  const [candidatosSeleccionados, setCandidatosSeleccionados] = useState<number[]>([]);

  const cargarCandidatos = async () => {
    const candidatos = await getCandidatos();
    setListaCandidatos(candidatos);
  };

  useEffect(() => {
    cargarCandidatos();
  }, []);

  const handleCheckboxChange = (index: number) => {
    if (candidatosSeleccionados.includes(index)) {
      setCandidatosSeleccionados(prevState => prevState.filter(id => id !== index));
    } else {
      setCandidatosSeleccionados(prevState => [...prevState, index]);
    }
  };

  const handleVotar = async () => {
    for (const id of candidatosSeleccionados) {
      await votarPorCandidato(id);
    }
    alert(`Has votado por los candidatos seleccionados.`);
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
      <h2>Selecciona uno o más candidatos para votar</h2>
      {listaCandidatos.map((candidato, index) => (
        <label key={index}>
          <input 
            type="checkbox"
            checked={candidatosSeleccionados.includes(index)}
            onChange={() => handleCheckboxChange(index)}
          />
          {candidato}
        </label>
      ))}
      <button onClick={handleVotar}>Votar</button>
    </div>
  );
};
