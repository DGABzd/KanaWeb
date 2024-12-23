import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const StatsContainer = styled.div`
  margin-top: 20px;
  font-size: 1.2em;
  text-align: center;
`;

function Stats({ practicedStats, correctAnswers, totalCharacters, onSave, onClose }) {
  return (
    <StatsContainer>
      <h2>Session Summary</h2>
      <p>Total Characters Practiced: {totalCharacters}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Accuracy: {((correctAnswers / totalCharacters) * 100).toFixed(2)}%</p>
      <h3>Character Stats</h3>
      <ul>
        {Object.entries(practicedStats).map(([character, stats]) => (
          <li key={character}>
            {character} ({stats.romaji}): Streak {stats.streak}/3
          </li>
        ))}
      </ul>
      <Button onClick={onSave}>Save Stats</Button>
      <Button onClick={onClose}>Return to Menu</Button>
    </StatsContainer>
  );
}

export default Stats;
