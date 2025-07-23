import React, { useState } from 'react';
import {
    Modal, Input, Select, Switch, Button, Radio, Form, Avatar
} from 'antd';
import {
    CalendarOutlined, UnorderedListOutlined, AppstoreOutlined
} from '@ant-design/icons';
import type { ModalProps } from '../../types';

const { Option } = Select;

const layoutOptions = [
    { label: <><UnorderedListOutlined /> List</>, value: 'list' },
    { label: <><AppstoreOutlined /> Board</>, value: 'board' },
    { label: <><CalendarOutlined /> Calendar</>, value: 'calendar' },
];

export const ModalAddProject: React.FC<ModalProps> = ({ open, onClose }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            title="Add Project"
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>Cancel</Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                    Add
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter project name' }]}
                >
                    <Input maxLength={120} />
                </Form.Item>

                <Form.Item label="Color" name="color" initialValue="charcoal">
                    <Select>
                        <Option value="charcoal">Charcoal</Option>
                        <Option value="blue">Blue</Option>
                        <Option value="green">Green</Option>
                        <Option value="red">Red</Option>
                        {/* Add more colors as needed */}
                    </Select>
                </Form.Item>

                <Form.Item label="Workspace" name="workspace" initialValue="My Projects">
                    <Input disabled prefix={<Avatar size="small" src="/your-avatar.png" />} />
                </Form.Item>

                <Form.Item label="Parent project" name="parentId" initialValue="">
                    <Select allowClear>
                        <Option value="">No Parent</Option>
                        {/* {parentProjects.map((proj) => (
                            <Option key={proj.id} value={proj.id}>{proj.name}</Option>
                        ))} */}
                    </Select>
                </Form.Item>

                <Form.Item name="favorite" valuePropName="checked">
                    <Switch /> Add to favorites
                </Form.Item>
            </Form>
        </Modal>
    );
};
