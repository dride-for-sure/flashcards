import styled, { css } from 'styled-components/macro';

const Tiles = styled.div`
  position:relative;
  display:flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify || 'flex-start'};
  box-sizing: border-box; 
  padding: 20px;
  height: 220px;
  background-color: ${(props) => props.bg || 'var(--color-monochrom-dark)'};

  ${(props) => props.status === 'SELECTED' && css`
    transform: scale(1.2) rotate(-2deg) translate(1%,2%);
    transition-duration: .8s;
    z-index: 2;
    border: 5px solid rgba(255,255,255,.5);
    padding: 15px;
    opacity: 1;
  `}

  ${(props) => props.checked && props.status === 'SOLVED' && css`
    display: flex;
    justify-content: center;
    opacity: 0.5;

    > div {
     display:none;
    }

    &:after {
      content:'🤟';
      font-size:7rem;
      align-self:center;
    }
  `}
  
  ${(props) => !props.checked && props.status === 'SOLVED' && css`
    display: flex;
    justify-content: center;
    opacity: 0.5;
    
    > div {
      display:none;
    }

    &:after {
      content:'☠️';
      font-size:7rem;
      align-self:center;
    }
  `}
`;

export default Tiles;
