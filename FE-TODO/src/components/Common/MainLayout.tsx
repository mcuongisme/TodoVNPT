// components/MainLayout.tsx
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const MainLayout = () => {
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
