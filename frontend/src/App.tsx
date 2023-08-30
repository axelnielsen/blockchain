import { useEffect, useState } from 'react';
import './App.css';
import { AgregarCandidato } from './components/newCandidate';
import { getCandidatos, getCandidatosConVotos, votarPorCandidato } from './fetchers/elecciones';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';


function App() {
  
  const [candidatos, setCandidatos] = useState<string[]>([]);
  const [candidatosConVotos, setCandidatosConVotos] = useState<any[]>([]);
  const [selectedCandidatoId, setSelectedCandidatoId] = useState<number | null>(null);
  const [showComponent, setShowComponent] = useState<string | null>(null);

  const nombresCandidatos = candidatosConVotos.map(c => String(c.nombre));  // Convertimos a String para asegurarnos
  const votosCandidatos = candidatosConVotos.map(c => parseInt(c.votos, 10));  // Convertimos a entero para asegurarnos
  
  console.log(nombresCandidatos);  // Debería mostrar un array de strings
  console.log(votosCandidatos);  // Debería mostrar un array de enteros

  const getApiData = async () => {
    const candidatosList = await getCandidatos();
    setCandidatos(candidatosList);
    
    const candidatosConVotosList = await getCandidatosConVotos();
    setCandidatosConVotos(candidatosConVotosList);
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

  const COLORS = ['#FFB6C1', '#FFDAB9', '#E6E6FA', '#D8BFD8', '#ADD8E6', '#F0E68C', '#90EE90', '#FFC0CB'];

  const chartData = candidatosConVotos.map((candidato, index) => ({
    name: candidato.nombre,
    votos: parseInt(candidato.votos, 10),
  }));



  return (
    <div>
      <button onClick={() => setShowComponent('AgregarCandidato')}>Agregar Candidato</button>
      <button onClick={() => setShowComponent('Votar')}>Votar por Candidato</button>
      <button onClick={() => setShowComponent('Resultados')}>Ver resultado votaciones</button>
      

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

      {showComponent === 'Resultados' && (
        
        <>
          <h2>Resultados de las votaciones</h2>
          <BarChart
            width={600}
            height={400}
            data={chartData}
            margin={{ bottom: 70 }} 
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="votos" name="Número de votos">
              {
                chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
            </Bar>
          </BarChart>

  
        </>
      )}
    </div>
  );
}

export default App;
