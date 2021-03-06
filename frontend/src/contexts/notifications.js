import { node } from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NotificationListItem from '../components/NotificationList/NotificationListItem/NotificationListItem';
import NotificationList from '../components/NotificationList/styled';

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notificationList, setNotificationList] = useState([]);

  const removeNotification = (id) => {
    setNotificationList(notificationList.filter((notification) => notification.id !== id));
  };

  const addNotification = (content) => {
    const notification = { id: uuidv4(), content };
    setNotificationList([notification, ...notificationList]);
    setTimeout(() => removeNotification(notification.id), 8000);
  };

  return (
    <NotificationContext.Provider value={[addNotification]}>
      <NotificationList>
        {notificationList && notificationList.map((notification) => (
          <NotificationListItem
            key={notification.id}
            notification={notification}
            onDelete={removeNotification} />
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
