import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import InputField from './InputField';

const ModeSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

function ModeSelector({ modes, onSelectMode, flashcardCount, setFlashcardCount, onStart }) {
  return (
    <ModeSelectorContainer>
      <h2>Select Practice Mode</h2>
      {modes.map((mode) => (
        <Button key={mode} onClick={() => onSelectMode(mode)}>
          {mode}
        </Button>
      ))}
      <h2>Set Number of Flashcards</h2>
      <InputField
        type="number"
        value={flashcardCount}
        onChange={(e) => setFlashcardCount(Number(e.target.value))}
        placeholder="Enter number of flashcards"
      />
      <Button onClick={onStart}>Start Practice</Button>
    </ModeSelectorContainer>
  );
}

export default ModeSelector;
