import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client/react';
import { client } from './apollo/client.ts';
import 'antd/dist/reset.css';
import { NotificationProvider } from './components/Common/NotificationProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </NotificationProvider>

  </StrictMode>
);