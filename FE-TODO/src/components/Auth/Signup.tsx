import React from 'react';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { ROUTES } from '../../routes/paths';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../../graphql/mutations/authMutations';
import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from '../Common/NotificationProvider';

const { Text, Link } = Typography;

export const Signup: React.FC = () => {
    const [resiter] = useMutation(REGISTER_MUTATION);
    const navigate = useNavigate();
    const { showNotification } = useNotificationContext();
    const onFinish = async (values: any) => {
        try {
            const { data } = await resiter({ variables: values });
            localStorage.setItem('access_token', data.register.access_token);
            showNotification('Đăng kí thành công', `Xin chào ${data.register.user.lastName}`, 'success');
            navigate(ROUTES.TODAY);
        } catch (error: any) {
            showNotification('Lỗi đăng kí', error.message || 'Vui lòng thử lại', 'error');
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
                <Form.Item label="Họ" name="firstName" rules={[{ required: true, message: 'Please enter first name' }]}>
                    <Input size='large' placeholder="Nhập họ của bạn..." />
                </Form.Item>
                <Form.Item label="Tên" name="lastName" rules={[{ required: true, message: 'Please enter last name' }]}>
                    <Input size='large' placeholder="Nhập tên của bạn..." />
                </Form.Item>

                <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Please enter password' }]}>
                    <Input.Password size='large' placeholder="Nhập mật khẩu..." />
                </Form.Item>

                <Form.Item>
                    <Button
                        color='danger'
                        variant="solid"
                        htmlType="submit" block
                        size='large'>
                        Đăng kí với Email
                    </Button>
                </Form.Item>
            </Form>
            <Divider />

            <Text type="secondary" style={{ fontSize: 12 }}>
                Đã có tài khoản? <Link href={ROUTES.ACCOUNT.LOGIN} type='danger'>Đến đăng nhập</Link>.
            </Text>
        </>
    );
};

