import styled, { css } from 'styled-components';

const Container = styled.li`
  font-size: 1.2rem;
  font-style: italic;
  text-transform: lowercase;
  ${(props) => props.itsMe && css`
    :after {
      content: '👈';
      margin-left: 5px;
    }
  `}
`;

export default Container;
