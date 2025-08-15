import { Button, Card, Form, Input } from 'antd'
import React from 'react'
import { useNotificationContext } from '../Common/NotificationProvider';
import { useChangePassword } from '../../hooks/useAuth';

export const ChangePassworrd = () => {
    const { showNotification } = useNotificationContext();
    const { handleChangePassword, loading } = useChangePassword();
    const [passForm] = Form.useForm();
    const handleChangePasswordSave = async (values: any) => {
        if (values.newPassword === values.confirmPassword) {
            try {
                await handleChangePassword(values.currentPassword, values.newPassword);
                showNotification("Cập nhật thông tin thành công", "Thông tin cá nhân đã được cập nhật", "success");
                passForm.resetFields();
                return;
            }
            catch (err: any) {
                showNotification("Có lỗi khi cập nhật thông tin, vui lòng thử lại", err, "error");
            }
        }
        else {
            showNotification("Mật khẩu mới và xác nhận không khớp", "Vui lòng kiểm tra lại", "error");
        }
    };
    return (
        <>
            <Card title="Đổi mật khẩu">
                <Form form={passForm} layout="vertical" onFinish={handleChangePasswordSave}>
                    <Form.Item
                        label="Mật khẩu hiện tại"
                        name="currentPassword"
                        rules={[{ required: true, message: "Nhập mật khẩu hiện tại" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[{ required: true, message: "Nhập mật khẩu mới" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Xác nhận mật khẩu mới"
                        name="confirmPassword"
                        rules={[{ required: true, message: "Xác nhận mật khẩu mới" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Đổi mật khẩu
                    </Button>
                </Form>
            </Card>
        </>
    )
}
