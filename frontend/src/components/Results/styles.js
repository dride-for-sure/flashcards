import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content:center;
  z-index:100;
  background-color: rgba(110,212,142,.8);
`;

export const ResultList = styled.ol``;

export const Button = styled.button`
  border: 0;
  border-radius:5px;
  padding: 8px;
  margin: 20px 0 0;
  color: white;
  outline: none;
  font-weight: 600;
  z-index:2;
  cursor: pointer;
  font-size: 1rem;
  padding: 12px;
  background: grey;
`;
