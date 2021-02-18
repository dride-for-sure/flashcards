import styled from 'styled-components';

export const Container = styled.div`
  padding:20px;
  display:flex;
  justify-content:center;
  height: 100vh;
  box-sizing: border-box;
`;

export const Center = styled.div`
  position: relative;
  align-self: center;
  display: flex;
  flex-direction: column;
  background-color: lightgreen;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  width: 50vh;
  min-height: 50vh;
`;

export const H1 = styled.h1`
  text-transform: uppercase;
  padding: 0;
  margin: 0;
`;

export const Subtitle = styled.span`
  font-style: italic;
`;

export const Slogan = styled.span`
  font-style:italic;
  
  :before{
    font-style: italic;
    content: "< ";
  }
  :after{
    font-style: italic;
    content: " >";
  }
`;
