import React from 'react';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { ROUTES } from '../../routes/paths';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutations/authMutations';
import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from '../Common/NotificationProvider';

const { Text, Link } = Typography;

export const Login: React.FC = () => {
    const [login] = useMutation(LOGIN_MUTATION);
    const navigate = useNavigate();
    const { showNotification } = useNotificationContext();
    const onFinish = async (values: any) => {
        try {
            const { data } = await login({ variables: values });
            localStorage.setItem('access_token', data.login.access_token);
            showNotification('Đăng nhập thành công', `Xin chào ${data.login.user.lastName}`, 'success');
            navigate(ROUTES.TODAY);
        } catch (error: any) {
            showNotification('Lỗi đăng nhập', error.message || 'Vui lòng thử lại', 'error');
        }
    };
    return (
        <>
            <Button
                icon={<GoogleOutlined />}
                block style={{ marginBottom: 12 }}
                color='danger'
                variant='outlined'
                size='large'
            >
                Tiếp tục với Google
            </Button>


            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email' }]}>
                    <Input size='large' placeholder="Enter your email..." />
                </Form.Item>

                <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Please enter password' }]}>
                    <Input.Password size='large' placeholder="Enter your password..." />
                </Form.Item>

                <Form.Item>
                    <Button
                        color='danger'
                        variant="solid"
                        htmlType="submit"
                        block
                        size='large'>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>

            <div style={{ textAlign: 'center', marginTop: 8 }}>
                <Link href={ROUTES.ACCOUNT.FORGOT} type='danger'>Quên mật khẩu?</Link>
            </div>

            <Divider />

            <Text type="secondary" style={{ fontSize: 12 }}>
                Bạn chưa có tài khoản?
                <Link href={ROUTES.ACCOUNT.REGISTER} type='danger'> Đăng kí</Link>.
            </Text>
        </>
    );
};

