// components/NotificationProvider.tsx
import React, { createContext, useContext } from 'react';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationContextProps {
  showNotification: (
    message: string,
    description?: string,
    type?: NotificationType
  ) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = (
    message: string,
    description = '',
    type: NotificationType = 'info'
  ) => {
    api[type]({
      message,
      description,
      placement: 'bottomRight',
      duration: 4,
      showProgress: true,
      pauseOnHover: true,
    });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotificationContext must be used within NotificationProvider');
  return ctx;
};
