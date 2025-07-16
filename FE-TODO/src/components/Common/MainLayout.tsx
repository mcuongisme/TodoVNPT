// components/MainLayout.tsx
import { Layout } from 'antd';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ROUTES } from '../../routes/paths';
import { isTokenExpired } from '../../utils/auth';
const MainLayout = () => {
    const token = localStorage.getItem('access_token');
    const location = useLocation();
    if (!token || isTokenExpired(token)) {
        return <Navigate to={ROUTES.ACCOUNT.LOGIN} state={{ from: location }} replace />;
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
                <Layout.Content style={{ margin: 16 }}>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
