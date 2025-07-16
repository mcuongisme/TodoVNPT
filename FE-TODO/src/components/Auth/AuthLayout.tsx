import React from 'react';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { GoogleOutlined, FacebookFilled, AppleOutlined } from '@ant-design/icons';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './Auth.module.scss';
import { ROUTES } from '../../routes/paths';
const { Title } = Typography;

export const AuthLayout: React.FC = () => {
    const location = useLocation();

    const getTitle = () => {
        if (location.pathname === ROUTES.ACCOUNT.LOGIN) return 'Log in';
        if (location.pathname === ROUTES.ACCOUNT.REGISTER) return 'Sign up';
        if (location.pathname === ROUTES.ACCOUNT.FORGOT) return 'Forgot your Password ?';
        return '';
    };
    return (
        <div className={styles.authContainer}>
            <div className={styles.leftContainer}>
                <img
                    src="/common/LogoApp.png"
                    alt="DoTrack logo"
                />
                <div className={styles.authLayout}>
                    <div style={{ textAlign: 'center', marginBottom: 24 }}>

                        <Title level={2} style={{ marginTop: 16 }}>
                            {getTitle()}
                        </Title>
                    </div>
                    <Outlet />
                </div>
            </div>
            <div className={styles.rightContainer}>
                <img src="/common/bgauth.webp" alt="Background" className={styles.backgroundImage} />
            </div>

        </div>

    );
};

