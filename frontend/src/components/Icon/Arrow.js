import styled from 'styled-components/macro';

const Arrow = styled.div`
  position:relative;
  border: 0;
  transform: rotate(-90deg);
  width: 10px;
  height: 10px;
  cursor: pointer;
  outline: none;
  
  :before {
    content: "";
    background-color: white;
    height: 11px;
    width: 3px;
    position: absolute;
    top:-3px;
    left:8px;
    border-radius: 50px;
    transform: rotate(45deg);
  }

  :after {
    background-color: white;
    content: "";
    left: -2px;
    top: 1px;
    position:absolute;
    height: 3px;
    width: 11px;
    border-radius: 50px;
    transform: rotate(225deg);
  }
`;

export default Arrow;
