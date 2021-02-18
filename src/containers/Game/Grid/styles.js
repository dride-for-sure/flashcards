import styled from 'styled-components';

const Container = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px 20px;
  padding: 20px;

  > div {
    position:relative;
    display:flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    height: 200px;
    padding: 20px;
    color: white;
    font-family: 'Times New Roman', Times, serif;
  }
`;

export default Container;
