import React from 'react';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import { ROUTES } from '../../routes/paths';

const { Text, Link } = Typography;

export const Signup: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
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
                Continue with Google
            </Button>

            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email' }]}>
                    <Input size='large' placeholder="Enter your email..." />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter password' }]}>
                    <Input.Password size='large' placeholder="Enter your password..." />
                </Form.Item>

                <Form.Item>
                    <Button
                        color='danger'
                        variant="solid"
                        htmlType="submit" block
                        size='large'>
                        Sign up with Email
                    </Button>
                </Form.Item>
            </Form>
            <Divider />

            <Text type="secondary" style={{ fontSize: 12 }}>
                Already signed up?
                <Link href={ROUTES.ACCOUNT.LOGIN} type='danger'> Go to login</Link>.
            </Text>
        </>
    );
};

