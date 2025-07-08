import React from 'react';
import { Layout } from 'antd';
import { Sidebar } from './components/Common/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InboxView } from './components/Inbox/InboxView';
import { TodayView } from './components/Today/TodayView';
import { ROUTES } from './routes/paths';
import { UpcomingView } from './components/Upcoming/UpcomingView';
import { LabelFilter } from './components/FilterLabel/FilterLabelView';
import { CompletedView } from './components/Completed/CompletedView';
const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Content style={{ margin: '16px' }}>
            <Routes>
              <Route path={ROUTES.INBOX} element={<InboxView />} />
              <Route path={ROUTES.TODAY} element={<TodayView />} />
              <Route path={ROUTES.UPCOMING} element={<UpcomingView />} />
              <Route path={ROUTES.LABEL_FILTER} element={<LabelFilter />} />
              <Route path={ROUTES.COMPLETED} element={<CompletedView />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>

  );
};

export default App;