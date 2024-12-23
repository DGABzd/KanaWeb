import styled from 'styled-components';

const Header = styled.header`
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  padding: 20px;
  width: 100%;
  text-align: center;
  font-size: 1.5em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export default Header;