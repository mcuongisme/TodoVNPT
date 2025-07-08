import React from 'react';
import { Layout } from 'antd';
// import type { User, Task, Conversation, Notification, Stats } from './types/index';
// import { currentUser, mockTasks, conversations, notifications, stats } from './data/mockData';
import { Sidebar } from './components/Common/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InboxView } from './components/Inbox/InboxView';
import { TodayView } from './components/Today/TodayView';
const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />

        <Layout>
          <Content style={{ margin: '16px' }}>
            <Routes>
              <Route path="/inbox" element={<InboxView />} />
              <Route path="/today" element={<TodayView />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>

  );
};

export default App;