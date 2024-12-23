import styled from 'styled-components';

const CardContainer = styled.div`
  background: ${(props) => (props.correct ? '#4caf50' : props.incorrect ? '#ff3b30' : props.theme.background)};
  border: 2px solid ${(props) => (props.correct || props.incorrect ? 'transparent' : '#ddd')};
  border-radius: 15px;
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  transition: background 0.3s, transform 0.3s;
  transform: ${(props) => (props.correct || props.incorrect ? 'scale(1.05)' : 'scale(1)')};
`;

export default CardContainer;
