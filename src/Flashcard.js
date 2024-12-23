import React, { useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  margin: 20px auto;
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 2em;
`;

const Input = styled.input`
  margin-top: 20px;
  padding: 10px;
  width: 80%;
  font-size: 1em;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 1em;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

function Flashcard({ kana, nextCard }) {
  const [input, setInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const checkAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <div>
      <CardContainer>{showAnswer ? kana.romaji : kana.character}</CardContainer>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Romaji"
      />
      <Button onClick={() => nextCard(input.toLowerCase() === kana.romaji.toLowerCase())}>
        {showAnswer ? 'Next' : 'Check'}
      </Button>
    </div>
  );
}

export default Flashcard;
