import { node } from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NotificationList from '../components/NotificationList/NotificationList';
import NotificationListItem from '../components/NotificationList/NotificationListItem';

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notificationList, setNotificationList] = useState([]);

  const removeNotifications = () => {
    setNotificationList(notificationList.filter((notification) =>
      notification.timestamp >= Date.now() * 1000 * 60 * 4));
  };

  const addNotification = (content) => {
    const notification = { id: uuidv4(), timestamp: Date.now(), content };
    setNotificationList([...notificationList, notification]);
    setTimeout(() => removeNotifications(), 4000);
  };

  return (
    <NotificationContext.Provider value={[addNotification]}>
      <NotificationList>
        {notificationList && notificationList.map((notification) => (
          <NotificationListItem
            key={notification.id}
            notification={notification}
            onDelete={removeNotifications} />
        ))}
      </NotificationList>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);

export default NotificationProvider;

NotificationProvider.propTypes = {
  children: node.isRequired,
};
