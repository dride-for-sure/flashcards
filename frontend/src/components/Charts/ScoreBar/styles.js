import styled from 'styled-components';

const Container = styled.div`
  align-self: flex-end;
  font-size: .8rem;
  text-transform: uppercase;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
  opacity: .7;
  white-space: nowrap;
  overflow: hidden;
  transition: width 3s ease-in-out;
  box-sizing: border-box;

  > div {
    padding: 3px 15px;
  }
`;

export default Container;
