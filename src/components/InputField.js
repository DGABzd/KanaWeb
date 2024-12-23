import styled from 'styled-components';

const InputField = styled.input`
  margin-top: 20px;
  padding: 10px;
  width: 80%;
  font-size: 1em;
  border: 2px solid #ccc;
  border-radius: 10px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border 0.2s;
  &:focus {
    border-color: ${(props) => props.theme.buttonBackground};
  }
`;

export default InputField;
