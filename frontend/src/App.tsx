import { useEffect, useState } from 'react';
import './App.css';
import { AgregarCandidato } from './components/newCandidate';
import { AgregarVotante } from './components/agregarVotante';  // Asegúrate de que el import es correcto
import { getCandidatos } from './fetchers/elecciones';
import { getVotantes } from './fetchers/votantes';  // Importa la función getVotantes

function App() {
  const [candidatos, setCandidatos] = useState<string[]>([]);  // Estado para candidatos
  const [votantes, setVotantes] = useState<string[]>([]);  // Estado para votantes

  const getApiData = async () => {
    const candidatosList = await getCandidatos();
    const votantesList = await getVotantes();

    setCandidatos(candidatosList);
    setVotantes(votantesList);
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div>
 
      <AgregarCandidato />

      <h2>Votantes</h2>
      <ul>
        {votantes.map((votante, index) => (
          <li key={index}>{votante}</li>
        ))}
      </ul>
      <AgregarVotante />
    </div>
  );
} 

export default App;
