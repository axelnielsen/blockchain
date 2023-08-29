import { useEffect, useState } from 'react';
import './App.css';
import { AgregarCandidato } from './components/newCandidate';
import { getCandidatos, votarPorCandidato } from './fetchers/elecciones';

function App() {
  const [candidatos, setCandidatos] = useState<string[]>([]);
  const [selectedCandidatoId, setSelectedCandidatoId] = useState<number | null>(null);
  const [showComponent, setShowComponent] = useState<string | null>(null);

  const getApiData = async () => {
    const candidatosList = await getCandidatos();
    setCandidatos(candidatosList);
  };

  const handleVotar = async () => {
    if (selectedCandidatoId === null) {
      alert('Por favor, selecciona un candidato antes de votar.');
      return;
    }
    await votarPorCandidato(selectedCandidatoId);
    alert('Voto registrado!');
    getApiData();
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div>
      <button onClick={() => setShowComponent('AgregarCandidato')}>Agregar Candidato</button>
      <button onClick={() => setShowComponent('Votar')}>Votar por Candidato</button>

      {showComponent === 'AgregarCandidato' && <AgregarCandidato />}

      {showComponent === 'Votar' && (
        <>
          <h2>Votar por un Candidato</h2>
          <select 
            value={selectedCandidatoId || ''} 
            onChange={(e) => setSelectedCandidatoId(Number(e.target.value))}
          >
            <option value="" disabled>Seleccione un candidato</option>
            {candidatos.map((candidato, index) => (
              <option key={index} value={index}>
                {candidato}
              </option>
            ))}
          </select>
          <button onClick={handleVotar}>Votar</button>
        </>
      )}
    </div>
  );
}

export default App;
