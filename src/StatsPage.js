import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar las escalas necesarias
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StatsContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function StatsPage({ onBack }) {
  const [stats, setStats] = useState({});
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const savedStats = JSON.parse(localStorage.getItem('kanaStats')) || {};
    setStats(savedStats);
    
    // Extraemos las fechas de las jugadas y las ordenamos
    const savedDates = Object.keys(savedStats).map(kana => savedStats[kana].date).filter((value, index, self) => self.indexOf(value) === index);
    setDates(savedDates.sort());
  }, []);

  // Función para obtener el streak de cada fecha
  const getStreakData = (date, level) => {
    return Object.keys(stats).reduce((count, kana) => {
      if (stats[kana].date === date && stats[kana].streak === level) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  // Construir los datos del gráfico
  const data = {
    labels: dates, // Fechas en el eje X
    datasets: [
      {
        label: 'Incorrect',
        data: dates.map(date => getStreakData(date, 0)), // Contar streak 0 para cada fecha
        borderColor: 'rgba(255, 99, 132, 1)', // Rojo
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'To Confirm',
        data: dates.map(date => getStreakData(date, 1)), // Contar streak 1 para cada fecha
        borderColor: 'rgba(255, 159, 64, 1)', // Amarillo
        backgroundColor: 'rgba(255, 159, 64, 0.4)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Correct',
        data: dates.map(date => getStreakData(date, 2)), // Contar streak 2 para cada fecha
        borderColor: 'rgba(75, 192, 192, 1)', // Verde
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Mastered',
        data: dates.map(date => getStreakData(date, 3)), // Contar streak 3 para cada fecha
        borderColor: 'rgba(54, 162, 235, 1)', // Azul
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <StatsContainer>
      <h2>Your Statistics</h2>
      {dates.length > 0 ? (
        <Line data={data} />
      ) : (
        <p>No stats available. Start practicing to track your progress!</p>
      )}
      <BackButton onClick={onBack}>Back to Menu</BackButton>
    </StatsContainer>
  );
}

export default StatsPage;
    