import styled from 'styled-components';

const NotificationList = styled.button`
  width: fit-content;
  margin: 20px;
  padding: 20px;
  box-sizing: border-box;
  background-color: silver;
  border: 0;
  text-align:left;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  transition: 0.5s;

  &:hover{
    opacity: .7;
    cursor: pointer;
  }

  position: relative;
  > button {
    font-size: 1.5rem;
    color: white;
    margin-right: 10px;
  }
  
  > span:first-of-type{
    position: absolute;
    top:-30px;
    right:-15px;
    font-size:3.5rem;
  }
`;

export default NotificationList;
