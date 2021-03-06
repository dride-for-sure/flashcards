import { func, string } from 'prop-types';
import Container from './styled';

export default function NotificationListItem({ notification, onDelete }) {
  return (
    <Container>
      <button type="button" onClick={() => onDelete(notification.id)}>✖️</button>
      <span>🔧</span>
      <span>{notification.content}</span>
    </Container>
  );
}

NotificationListItem.propTypes = {
  notification: string.isRequired,
  onDelete: func.isRequired,
};
