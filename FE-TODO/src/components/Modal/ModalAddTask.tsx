import React, { useState } from "react";
import {
    Modal,
    Input,
    Button,
    Space,
    Dropdown,
    Menu,
    Select,
} from "antd";
import {
    CalendarOutlined,
    FlagOutlined,
    BellOutlined,
    MoreOutlined,
    InboxOutlined,
    ClockCircleOutlined,
    TagOutlined,
} from "@ant-design/icons";
import type { ModalProps } from "../../types";
const { TextArea } = Input;
const { Option } = Select;



const AddTaskModal: React.FC<ModalProps> = ({ open, onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        setTitle("");
        setDescription("");
        onClose();
    };

    const projectMenu = (
        <Menu>
            <Menu.Item icon={<InboxOutlined />}>Inbox</Menu.Item>
            <Menu.Item>Thiết kế Website</Menu.Item>
            <Menu.Item>Phát triển ứng dụng</Menu.Item>
        </Menu>
    );
    const moreMenu = (
        <Menu>
            <Menu.Item icon={<TagOutlined />}>Gán nhãn</Menu.Item>
            <Menu.Item icon={<ClockCircleOutlined />}>Deadline</Menu.Item>
        </Menu>
    );

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            closable={false}
            width={500}
            style={{ top: 100 }}
        >
            <Input
                placeholder="Tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                bordered={false}
                style={{
                    fontSize: 18,
                    fontWeight: 500,
                    padding: 0,
                    marginBottom: 4,
                }}
            />
            <TextArea
                placeholder="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                bordered={false}
                rows={2}
                style={{ marginBottom: 16 }}
            />

            <Space style={{ marginBottom: 16 }}>
                <Button icon={<CalendarOutlined />}>Date</Button>
                <Button icon={<FlagOutlined />}>Priority</Button>
                <Button icon={<BellOutlined />}>Reminders</Button>
                <Dropdown overlay={moreMenu} trigger={["click"]}>
                    <Button icon={<MoreOutlined />} />
                </Dropdown>
            </Space>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #f0f0f0",
                    paddingTop: 12,
                }}
            >
                <Dropdown overlay={projectMenu} trigger={["click"]}>
                    <Button icon={<InboxOutlined />}>Inbox</Button>
                </Dropdown>

                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        type="primary"
                        style={{ backgroundColor: "#a81f00", borderColor: "#a81f00" }}
                        onClick={handleSubmit}
                    >
                        Add task
                    </Button>
                </Space>
            </div>
        </Modal>
    );
};

export default AddTaskModal;
