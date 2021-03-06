import { func, string } from 'prop-types';
import Container from './styled';

export default function NotificationListItem({ notification, onDelete }) {
  return (
    <Container type="button" onClick={() => onDelete(notification.id)}>
      <span>🔧</span>
      {notification.content}
    </Container>
  );
}

NotificationListItem.propTypes = {
  notification: string.isRequired,
  onDelete: func.isRequired,
};
