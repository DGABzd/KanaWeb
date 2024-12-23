import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  margin: 20px;
  font-size: 1.2em;
`;

function Statistics({ total, correct }) {
  return (
    <StatsContainer>
      <p>Total Characters: {total}</p>
      <p>Correct Answers: {correct}</p>
      <p>Accuracy: {((correct / total) * 100).toFixed(2)}%</p>
    </StatsContainer>
  );
}

export default Statistics;
