import { useState } from "react";
import { Card, Form, Input, Button, Space, message } from "antd";
import { useChangeInfo, useGetCurrentUser } from "../../hooks/useAuth";
import { useNotificationContext } from "../Common/NotificationProvider";
import { ChangePassworrd } from "./ChangePassworrd";

export const UserInfoLayout = () => {
    const { handleChangeInfo, loading } = useChangeInfo();
    const { user } = useGetCurrentUser();
    const { showNotification } = useNotificationContext();


    const [editing, setEditing] = useState(false);

    const [form] = Form.useForm();


    const handleSaveProfile = async (values: any) => {
        try {
            await handleChangeInfo(values.firstName, values.lastName);
            setEditing(false);
            showNotification("Cập nhật thông tin thành công", "Thông tin cá nhân đã được cập nhật", "success");
        } catch (err) {
            showNotification("Error", "Có lỗi khi cập nhật thông tin, vui lòng thử lại", "error");
        }
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            {/* Thông tin cá nhân */}
            <Card title="Thông tin cá nhân">
                {!editing ? (
                    <>
                        {user && (
                            <>
                                <p><strong>Họ:</strong> {user.firstName}</p>
                                <p><strong>Tên:</strong> {user.lastName}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                            </>
                        )}
                        <Button color="danger" variant="solid" onClick={() => { form.setFieldsValue(user); setEditing(true); }}>
                            Chỉnh sửa
                        </Button>
                    </>
                ) : (
                    <Form form={form} initialValues={user} layout="vertical" onFinish={handleSaveProfile}>
                        <Form.Item label="Họ" name="firstName" rules={[{ required: true, message: "Vui lòng nhập họ" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Tên" name="lastName" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
                            <Input />
                        </Form.Item>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <Space>
                            <Button onClick={() => setEditing(false)}>Hủy</Button>
                            <Button color="danger" variant="solid" htmlType="submit" loading={loading}>Lưu</Button>
                        </Space>
                    </Form>
                )}
            </Card>

            <ChangePassworrd />
        </Space>
    );
};
