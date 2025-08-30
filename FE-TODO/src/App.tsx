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
import { ProjectView } from './components/MyProject/ProjectView';
import { JoinProjectPage } from './components/MyProject/JoinProjectPage';
import { LabelTaskList } from './components/FilterLabel/LabelTaskList';
import { UserInfoLayout } from './components/User/UserInfoLayout';
import RegisterEmployee from './components/User/RegisterEmployee';
import { useGetCurrentUser } from './hooks/useAuth';
import RequireRole from './components/User/RequireRole';


const App: React.FC = () => {
  const { user } = useGetCurrentUser()

  return (
    <Router>
      <Routes>
        {/* Auth layout */}

        <Route element={<AuthLayout />}>
          <Route path={ROUTES.ACCOUNT.LOGIN} element={<Login />} />
          <Route path={ROUTES.ACCOUNT.REGISTER} element={<Signup />} />
          <Route path={ROUTES.ACCOUNT.FORGOT} element={<ForgotPassword />} />
        </Route>

        {/* Main layout */}
        <Route element={<MainLayout />}>

          <Route path={ROUTES.ACCOUNT.PROFILE} element={<UserInfoLayout />} />
          <Route path={ROUTES.TODAY} element={<TodayView />} />
          <Route path={ROUTES.UPCOMING} element={<UpcomingView />} />
          <Route path={ROUTES.COMPLETED} element={<CompletedView />} />

          {/* CUSTOMER + STAFF chung */}
          <Route element={<RequireRole allowedRoles={["CUSTOMER", "STAFF"]} user={user} />}>

            <Route path={ROUTES.INBOX} element={<InboxView />} />
            <Route path={ROUTES.LABEL_FILTER} element={<LabelFilter />} />
            <Route path={ROUTES.NOTIFICATIONS} element={<NotificationView />} />
            <Route path={ROUTES.PROJECT.INVITE} element={<JoinProjectPage />} />
            <Route path={ROUTES.PROJECT.DETAIL(":id")} element={<ProjectView />} />
            <Route path={ROUTES.LABEL(":id")} element={<LabelTaskList />} />
          </Route>
          <Route element={<RequireRole allowedRoles={["ADMIN"]} user={user} />}>
            <Route path={ROUTES.ACCOUNT.REGISTER_EMPLOYEE} element={<RegisterEmployee />} />

          </Route>

          {/* ADMIN */}

        </Route>
      </Routes>
    </Router>
  );
}

export default App;