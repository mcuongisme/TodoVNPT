import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InboxView } from './components/Inbox/InboxView';
import { TodayView } from './components/Today/TodayView';
import { ROUTES } from './routes/paths';
import { UpcomingView } from './components/Upcoming/UpcomingView';
import { LabelFilter } from './components/FilterLabel/FilterLabelView';
import { CompletedView } from './components/Completed/CompletedView';
import { NotificationView } from './components/Notification/NotificationView';
import { Login } from './components/Auth/Login';
import MainLayout from './components/Common/MainLayout';
import { AuthLayout } from './components/Auth/AuthLayout';
import { Signup } from './components/Auth/Signup';
import { ForgotPassword } from './components/Auth/ForgotPassword';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.ACCOUNT.LOGIN} element={<Login />} />
          <Route path={ROUTES.ACCOUNT.REGISTER} element={<Signup />} />
          <Route path={ROUTES.ACCOUNT.FORGOT} element={<ForgotPassword />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.INBOX} element={<InboxView />} />
          <Route path={ROUTES.TODAY} element={<TodayView />} />
          <Route path={ROUTES.UPCOMING} element={<UpcomingView />} />
          <Route path={ROUTES.LABEL_FILTER} element={<LabelFilter />} />
          <Route path={ROUTES.COMPLETED} element={<CompletedView />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<NotificationView />} />
        </Route>
      </Routes>
    </Router>


  );
};

export default App;