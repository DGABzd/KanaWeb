import React from 'react';
import styled from 'styled-components';

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
  return (
    <StatsContainer>
      <h2>Your Statistics</h2>
      <p>Feature under development: Stats graph coming soon!</p>
      <BackButton onClick={onBack}>Back to Menu</BackButton>
    </StatsContainer>
  );
}

export default StatsPage;
