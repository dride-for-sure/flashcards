import styled from 'styled-components/macro';

const Button = styled.button`
  background-color: transparent;
  border: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: 0.5s;
  font-size: ${(props) => props.fontsize || '1rem'};

  &:hover {
    opacity: .7
  }
`;

export default Button;
