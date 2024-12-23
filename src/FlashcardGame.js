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
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 1em;
  border: 2px solid ${(props) => props.theme.buttonBackground};
  border-radius: 5px;
`;

function FlashcardGame({ mode, count, onEnd }) {
  const filteredData = kanaData.filter((kana) => mode === 'all' || kana.type === mode);
  const selectedFlashcards = filteredData.slice(0, count);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [streak, setStreak] = useState(0);

  const currentFlashcard = selectedFlashcards[currentIndex];

  const handleSubmit = () => {
    if (inputValue.trim().toLowerCase() === currentFlashcard.romaji.toLowerCase()) {
      alert('Correct!');
      setStreak(streak + 1);
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('Incorrect!');
      setStreak(0);
    }
    setInputValue('');
    if (currentIndex + 1 === selectedFlashcards.length) {
      onEnd();
    }
  };

  return (
    <FlashcardContainer>
      <Flashcard>{currentFlashcard?.character}</Flashcard>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Type the Romaji"
      />
      <Button onClick={handleSubmit}>Check</Button>
    </FlashcardContainer>
  );
}

export default FlashcardGame;
