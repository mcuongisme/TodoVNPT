import React, { useMemo, useState } from "react";
import {
    Button,
    ConfigProvider,
    Form,
    message,
    Typography,
    Card,
    Space,
    Input,
    Select,
    Upload,
} from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { useRegisterEmployee } from "../../hooks/useAuth";
import { InboxOutlined } from "@ant-design/icons";
import { useNotificationContext } from "../Common/NotificationProvider";

const { Title, Text, Link } = Typography;

interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "ADMIN" | "STAFF";
    // avatar?: string;
}

// async function fileToBase64(file: File): Promise<string> {
//     const reader = new FileReader();
//     return new Promise((resolve, reject) => {
//         reader.onload = () => resolve(String(reader.result));
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//     });
// }

export default function RegisterEmployee() {
    const [form] = Form.useForm<RegisterPayload & { confirmPassword: string }>();
    // const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { showNotification } = useNotificationContext();
    const { handleRegisterEmployee, loading, error } = useRegisterEmployee();

    // const uploadProps: UploadProps = useMemo(
    //     () => ({
    //         name: "avatar",
    //         multiple: false,
    //         fileList,
    //         maxCount: 1,
    //         accept: "image/*",
    //         beforeUpload: () => false,
    //         onChange: ({ fileList: fl }) => setFileList(fl),
    //         onRemove: () => {
    //             setFileList([]);
    //         },
    //     }),
    //     [fileList]
    // );

    const onFinish = async (values: any) => {
        try {
            const payload: RegisterPayload = {
                firstName: values.firstName?.trim(),
                lastName: values.lastName?.trim(),
                email: values.email?.trim().toLowerCase(),
                password: values.password,
                role: values.role,
            };
            // if (fileList[0]?.originFileObj) {
            //     payload.avatar = await fileToBase64(fileList[0].originFileObj as File);
            // }

            // 👇 gọi mutation GraphQL
            const res = await handleRegisterEmployee(
                payload.email,
                payload.password,
                payload.firstName,
                payload.lastName,
                payload.role,
                // payload.avatar
            );

            showNotification("Tạo tài khoản thành công", "Tài khoản cho nhân viên mới", "success");
            form.resetFields();
            // setFileList([]);
        } catch (err: any) {
            showNotification(`Lỗi: ${err?.message}`, "Không thể tạo tài khoản. Vui lòng thử lại sau.", "error");
        }
    };

    const validatePassword = (_: any, value: string) => {
        if (!value) return Promise.reject("Vui lòng nhập mật khẩu");
        if (value.length < 8) return Promise.reject("Mật khẩu phải từ 8 ký tự");
        if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value))
            return Promise.reject("Cần có chữ hoa, chữ thường và số");
        return Promise.resolve();
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#ff4d4f",
                    colorError: "#ff4d4f",
                    colorLink: "#ff4d4f",
                    borderRadius: 12,
                },
            }}
        >
            <div style={{ width: "100%", height: "100%" }}>
                <Card style={{ width: "100%", height: "100%", border: "none" }} bodyStyle={{ padding: 32 }}>
                    <Space direction="vertical" size={16} style={{ width: "100%" }}>
                        <Title level={3} style={{ marginBottom: 0 }}>
                            Đăng ký tài khoản nhân viên
                        </Title>
                        <Text type="secondary">
                            Tạo tài khoản cho nhân viên/manager để truy cập hệ thống quản lý yêu cầu.
                        </Text>
                    </Space>

                    <Form layout="vertical" form={form} onFinish={onFinish} style={{ marginTop: 20 }} requiredMark>
                        <Form.Item label="Họ" name="firstName" rules={[{ required: true, message: "Vui lòng nhập họ" }]}>
                            <Input placeholder="Nguyễn" autoComplete="given-name" />
                        </Form.Item>
                        <Form.Item label="Tên" name="lastName" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
                            <Input placeholder="Văn A" autoComplete="family-name" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Vui lòng nhập email" }]}
                        >
                            <Input
                                placeholder="nhập tên (ví dụ: nguyenvana)"
                                autoComplete="off"
                                addonAfter="@vnpt.work.vn"
                            />
                        </Form.Item>
                        <Form.Item label="Mật khẩu" name="password" rules={[{ validator: validatePassword }]} hasFeedback>
                            <Input.Password placeholder="Ít nhất 8 ký tự, gồm hoa/thường/số" />
                        </Form.Item>
                        <Form.Item label="Xác nhận mật khẩu" name="confirmPassword" dependencies={["password"]} hasFeedback rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu" }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue("password") === value) { return Promise.resolve(); } return Promise.reject("Mật khẩu không khớp"); }, }),]} >
                            <Input.Password placeholder="Nhập lại mật khẩu" />
                        </Form.Item>
                        <Form.Item label="Vai trò" name="role" rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}>
                            <Select placeholder="Chọn vai trò" options={[{ value: "STAFF", label: "Nhân viên" }, { value: "ADMIN", label: "Quản lý" }]} />
                        </Form.Item>
                        {/* <Form.Item label="Ảnh đại diện (tuỳ chọn)">
                            <Upload.Dragger {...uploadProps} listType="picture">
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Kéo & thả ảnh vào đây hoặc bấm để chọn</p>
                                <p className="ant-upload-hint">PNG, JPG, JPEG • Tối đa 5MB</p>
                            </Upload.Dragger>
                        </Form.Item> */}

                        <Form.Item shouldUpdate>
                            {() => (
                                <Space style={{ width: "100%", justifyContent: "space-between" }}>
                                    <Button htmlType="submit" danger loading={loading}>
                                        Tạo tài khoản
                                    </Button>
                                    <Button htmlType="button" onClick={() => { form.resetFields() }}>
                                        Làm mới
                                    </Button>
                                </Space>
                            )}
                        </Form.Item>

                        {error && <Text type="danger">Lỗi: {error.message}</Text>}

                    </Form>
                </Card>
            </div>
        </ConfigProvider>
    );
}
