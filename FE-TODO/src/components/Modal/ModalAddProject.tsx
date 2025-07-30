import React, { useState } from 'react';
import {
    Modal, Input, Select, Switch, Button, Form, Avatar
} from 'antd';
import type { ModalProps } from '../../types';
import { useCreateProject } from '../../hooks/useProject';
import { useNotificationContext } from '../Common/NotificationProvider';

const { Option } = Select;

export const ModalAddProject: React.FC<ModalProps> = ({ open, onClose }) => {
    const { handleCreateProject, loading, error } = useCreateProject();
    const { showNotification } = useNotificationContext();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        const projectData = {
            name: name.trim(),
            description: description.trim(),
        };

        try {
            await handleCreateProject(projectData);
            showNotification("Tạo mới dự án thành công", "Dự án đã được tạo thành công", "success");
            setName('');
            setDescription('');
            onClose();
        } catch (err) {
            console.error("Error creating project:", error?.message || err);
            showNotification("Lỗi", "Có lỗi khi tạo vui lòng thử lại", "error");
        }
    };

    return (
        <Modal
            title="Add Project"
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>Cancel</Button>,
                <Button key="submit" type="primary" onClick={handleSubmit} loading={loading}>
                    Add
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Tên dự án"
                    name="name"
                    rules={[{ required: true, message: 'Nhập tên dự án' }]}
                >
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        maxLength={120}
                    />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Nhập mô tả dự án' }]}
                >
                    <Input
                        maxLength={120}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Color" name="color" initialValue="charcoal">
                    <Select>
                        <Option value="charcoal">Charcoal</Option>
                        <Option value="blue">Blue</Option>
                        <Option value="green">Green</Option>
                        <Option value="red">Red</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Workspace" name="workspace" initialValue="My Projects">
                    <Input disabled prefix={<Avatar size="small" src="/your-avatar.png" />} />
                </Form.Item>

                <Form.Item label="Parent project" name="parentId" initialValue="">
                    <Select allowClear>
                        <Option value="">No Parent</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
