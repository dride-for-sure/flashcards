import { func, string } from 'prop-types';
import styled from 'styled-components/macro';

export default function NotificationListItem({ notification, onDelete }) {
  return (
    <Container type="button" onClick={() => onDelete(notification.id)}>
      <span>🔧</span>
      {notification.content}
    </Container>
  );
}

const Container = styled.button`
  width: fit-content;
  margin: 20px;
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--color-monochrom-medium);
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

NotificationListItem.propTypes = {
  notification: string.isRequired,
  onDelete: func.isRequired,
};
