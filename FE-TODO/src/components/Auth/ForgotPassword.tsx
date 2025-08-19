import React from 'react'
import { Button, Divider, Form, Input, Typography } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { ROUTES } from '../../routes/paths';
const { Text, Link } = Typography;
export const ForgotPassword = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    return (
        <>

            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email' }]}>
                    <Input size='large' placeholder="Enter your email..." />
                </Form.Item>
                <Form.Item>
                    <Button
                        color='danger'
                        variant="solid"
                        htmlType="submit" block
                        size='large'>
                        Lấy lại mật khẩu
                    </Button>
                </Form.Item>
            </Form>
            <Divider />

            <Text type="secondary" style={{ fontSize: 12 }}>
                <Link href={ROUTES.ACCOUNT.LOGIN} type='danger'> Đến đăng nhập</Link>.
            </Text>
        </>
    )
}
