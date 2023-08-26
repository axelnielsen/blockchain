import { useEffect, useState } from 'react';
import './App.css';
import { AgregarCandidato } from './components/newCandidate';
import { AgregarVotante } from './components/agregarVotante'; 
import { getCandidatos, votarPorCandidato } from './fetchers/elecciones'; // Importa votarPorCandidato
import { getVotantes } from './fetchers/votantes';

function App() {
  const [candidatos, setCandidatos] = useState<string[]>([]);
  const [votantes, setVotantes] = useState<string[]>([]);
  const [selectedCandidato, setSelectedCandidato] = useState<string>('');

  const getApiData = async () => {
    const candidatosList = await getCandidatos();
    const votantesList = await getVotantes();

    setCandidatos(candidatosList);
    setVotantes(votantesList);
  };

  const handleVotar = async () => {
    if (!selectedCandidato || selectedCandidato === "") {
      alert('Por favor, selecciona un candidato antes de votar.');
      return;
    }
  
    await votarPorCandidato(Number(selectedCandidato));
    alert('Voto registrado!');
    getApiData(); // Actualizar la lista de candidatos y votantes después de votar
  };
  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div>
      <AgregarCandidato />

      <h2>Votar por un Candidato</h2>
      <select value={selectedCandidato} onChange={(e) => setSelectedCandidato(e.target.value)}>
        {candidatos.map((candidato, index) => (
          <option key={index} value={candidato}>
            {candidato}
          </option>
        ))}
      </select>
      <button onClick={handleVotar}>Votar</button>


    </div>
  );
}

export default App;
