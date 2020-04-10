import React, { useState, useEffect, useMemo } from 'react';
import { formatDistance, parseISO } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { MdNotifications } from 'react-icons/md';
import api from '~/services/api';
import {
  Container,
  Badge,
  Scroll,
  NotificationList,
  Notification,
} from './styles';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [visible, setVisible] = useState(false);
  const hasUnread = useMemo(
    () =>
      Boolean(
        notifications.find((notification) => notification.read === false)
      ),
    [notifications]
  );

  useEffect(() => {
    async function loadNotification() {
      const response = await api.get(`/v1/notifications`);

      const data = response.data.map((notification) => ({
        ...notification,
        formatedData: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          {
            addSuffix: true,
            locale: ptBr,
          }
        ),
      }));

      setNotifications(data);
    }

    loadNotification();
  }, []);

  function handleTogge() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(_id) {
    await api.put(`/v1/notifications/${_id}`);
    const data = notifications.map((notification) =>
      notification._id === _id ? { ...notification, read: true } : notification
    );

    setNotifications(data);
  }

  return (
    <Container>
      <Badge hasUnread={hasUnread} onClick={handleTogge}>
        <MdNotifications size={20} color="#444857" />
      </Badge>
      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map((notification) => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.formatedData}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
