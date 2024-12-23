import styled from 'styled-components';

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 1em;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.2s;
  &:hover {
    background-color: ${(props) => props.theme.buttonBackground === '#007aff' ? '#005bb5' : '#388e3c'};
  }
`;

export default Button;
