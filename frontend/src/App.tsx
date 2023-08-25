import { useEffect, useState } from 'react';
import './App.css';
import { ChangeMessengerMessage } from './components/ChangeMessengerMessage';
import { AgregarCandidato } from './components/newCandidate';  // Importa el componente AgregarCandidato
import { getMessengerMessage } from './fetchers/messenger';
import { getCandidatos } from './fetchers/elecciones';  // Importa la función getCandidatos

function App() {
  const [message, setMessage] = useState();
  const [candidatos, setCandidatos] = useState([]);  // Estado para almacenar la lista de candidatos

  const getApiData = async () => {
    const response = await getMessengerMessage();
    setMessage(response.message);
    
    // Obtiene la lista de candidatos del backend
    const candidatosList = await getCandidatos();
    setCandidatos(candidatosList);
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div>
    
      {/* Renderiza la lista de candidatos */}


      {/* Incluye el componente para agregar candidatos */}
      <AgregarCandidato />
    </div>
  );
} 

export default App;
