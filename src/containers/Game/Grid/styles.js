import styled from 'styled-components';

const Container = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px 20px;
  padding: 20px;

  > div {
    position:relative;
    padding: 20px;
    display:flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 200px;
    justify-content: center;
    color: white;
    font-family: 'Times New Roman', Times, serif;

    > h1 {
      font-weight: 600;
      font-size: 2rem;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
    }
  }
`;

export default Container;
