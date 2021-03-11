import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  z-index:100;
  background-color: rgba(110,212,142,.8);

  > div {
    align-self:center;
    display:flex;
    flex-direction: column;
    width: 50%;
    max-width: 500px;
    padding-bottom:10%;

    > *{
      width: fit-content;
      align-self:center;
    }

    > span:first-of-type{
      font-size: 10rem;
      margin-bottom: 40px;
    }

    > h1 {
      font-weight: 600;
      font-size: 4rem;
      text-transform: uppercase;
      margin:0;
      padding: 0;
    }
  }
`;

export const ResultList = styled.ol`
  margin: 35px 0 40px;
  padding: 0;
  list-style: none;

  > li+li {
    margin-top: 10px;
  }
`;

export const Button = styled.button`
  border: 0;
  border-radius:5px;
  padding: 8px;
  margin: 0;
  color: white;
  outline: none;
  font-weight: 600;
  z-index:2;
  cursor: pointer;
  font-size: 1rem;
  padding: 12px;
  background-color: salmon;
`;
