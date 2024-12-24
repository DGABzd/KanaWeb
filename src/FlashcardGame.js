import React, { useState } from 'react';
import styled from 'styled-components';
import { kanaData } from './kanaData';
import Button from './components/Button';

const FlashcardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Flashcard = styled.div`
  margin: 20px 0;
  padding: 40px 20px;
  font-size: 3em;
  background-color: ${(props) => props.bgColor || props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.5s ease, transform 0.2s ease;
  ${(props) =>
    props.shake &&
    `
    animation: shake 0.2s ease-in-out;
  `}

  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 1em;
  border: 2px solid ${(props) => props.theme.buttonBackground};
  border-radius: 5px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ResponseMessage = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: ${(props) => props.color || '#000'};
  margin-bottom: 10px;
`;

function FlashcardGame({ mode, count, onEnd }) {
  const filteredData = kanaData.filter((kana) => mode === 'all' || kana.type === mode);
  const selectedFlashcards = filteredData.slice(0, count);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [streaks, setStreaks] = useState(
    JSON.parse(localStorage.getItem('kanaStats')) || {}
  );
  const [flashcardColor, setFlashcardColor] = useState(''); // Variable para el color del fondo de la tarjeta
  const [shake, setShake] = useState(false); // Estado para controlar el shake
  const [responseMessage, setResponseMessage] = useState(''); // Estado para el mensaje de respuesta
  const [responseColor, setResponseColor] = useState(''); // Estado para el color del mensaje de respuesta

  const currentFlashcard = selectedFlashcards[currentIndex];

  // Función para obtener la fecha actual en formato "YYYY-MM-DD"
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Devuelve la fecha en formato "YYYY-MM-DD"
  };

  // Actualizar el streak y registrar la fecha
  const handleResult = (kana, result) => {
    const currentDate = getCurrentDate(); // Obtener la fecha actual

    setStreaks((prevStreaks) => {
      const newStreaks = {
        ...prevStreaks,
        [kana]: {
          streak: result === 1
            ? Math.min(3, (prevStreaks[kana]?.streak || 0) + 1)  // Incrementar el streak si es correcto
            : 0,  // Resetear el streak si es incorrecto
          date: currentDate, // Guardar la fecha de la jugada
        },
      };
      localStorage.setItem('kanaStats', JSON.stringify(newStreaks)); // Actualizar localStorage
      return newStreaks;
    });

    // Animar la tarjeta antes de pasar a la siguiente pregunta
    setShake(true);
    setTimeout(() => {
      setShake(false);
      if (currentIndex + 1 >= count) {
        onEnd();
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
      setFlashcardColor('#007aff')
    }, 500); // 200 ms para el "shake"
  };

  // Enviar la respuesta
  const handleSubmit = () => {
    if (inputValue.trim().toLowerCase() === currentFlashcard.romaji.toLowerCase()) {
      setFlashcardColor('green'); // Establecer color verde si es correcto
      setResponseMessage('Correct!');
      setResponseColor('green');
      handleResult(currentFlashcard.character, 1);  // Actualizar streak en base a la respuesta correcta
    } else {
      setFlashcardColor('red'); // Establecer color rojo si es incorrecto
      setResponseMessage('Incorrect!');
      setResponseColor('red');
      handleResult(currentFlashcard.character, -1);  // Resetear streak en base a la respuesta incorrecta
    }
    setInputValue('');

    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      setResponseMessage('');
    }, 1000);
  };

  // Botón "I don't know" para marcar la respuesta como incorrecta
  const handleIDontKnow = () => {
    setFlashcardColor('orange'); // Establecer color naranja si no sé la respuesta
    setResponseMessage('Incorrect!');
    setResponseColor('red');
    handleResult(currentFlashcard.character, -1);  // Resetear streak y marcar incorrecto
    setInputValue('');

    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      setResponseMessage('');
    }, 1000);
  };

  return (
    <FlashcardContainer>
      {responseMessage && (
        <ResponseMessage color={responseColor}>{responseMessage}</ResponseMessage>
      )}
      <Flashcard bgColor={flashcardColor} shake={shake}>
        {currentFlashcard?.character}
      </Flashcard>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Type the Romaji"
      />
      <ActionButtons>
        <Button onClick={handleSubmit}>Check</Button>
        <Button onClick={handleIDontKnow}>I don't know</Button>
      </ActionButtons>
      <div>Current streak for {currentFlashcard.character}: {streaks[currentFlashcard.character]?.streak || 0}</div>
    </FlashcardContainer>
  );
}

export default FlashcardGame;
