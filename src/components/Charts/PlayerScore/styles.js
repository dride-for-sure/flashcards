import styled from 'styled-components';

const Container = styled.div`
  align-self: flex-end;
  padding: 3px 15px;
  font-size: .8rem;
  font-family: 'Times New Roman', Times, serif;
  text-transform: uppercase;
  color:white;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
  opacity: 1;
  white-space: nowrap;
  overflow: hidden;
  transition: width 3s ease-in-out;
`;

export default Container;
