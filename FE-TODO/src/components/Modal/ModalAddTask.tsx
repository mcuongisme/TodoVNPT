import React, { useState } from "react";
import {
    Modal,
    Input,
    Button,
    Space,
    Dropdown,
    Menu,
    Select,
    DatePicker,
    message,
} from "antd";
import {
    BellOutlined,
    MoreOutlined,
    InboxOutlined,
    ClockCircleOutlined,
    TagOutlined,
    FlagFilled,
} from "@ant-design/icons";
import type { ModalProps } from "../../types/index";
import dayjs from "dayjs";
import { useCreateTask } from "../../hooks/useTasks";
import { useNotificationContext } from "../Common/NotificationProvider";
const { TextArea } = Input;

const AddTaskModal: React.FC<ModalProps> = ({ open, onClose }) => {
    const { handleCreateTask, loading, error } = useCreateTask();
    const { showNotification } = useNotificationContext();
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null);
    const [priority, setPriority] = useState<string>("P4");

    const handleChange = (value: string) => {
        setPriority(value);
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            message.error("Please enter a task title.");
            return;
        }
        const taskData = {
            title: title.trim(),
            note: note.trim() || undefined,
            due_date: dueDate
                ? dueDate.format("YYYY-MM-DD HH:mm:ss")
                : undefined,
            priority: priority,
        };

        try {
            await handleCreateTask(taskData);
            showNotification("Thêm công việc thành công", "Công việc đã được thêm vào danh sách", "success");
            setTitle("");
            setNote("");
            setDueDate(null);
            setPriority("P4");
            onClose();
        } catch (err) {
            showNotification("Thêm công việc thất bại", error?.message || "Vui lòng thử lại sau", "error");
        }
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
                value={note}
                onChange={(e) => setNote(e.target.value)}
                bordered={false}
                rows={2}
                style={{ marginBottom: 16 }}
            />

            <Space style={{ marginBottom: 16 }}>
                <DatePicker
                    format="DD-MM-YYYY HH:mm:ss"
                    minDate={dayjs()}
                    placeholder="Chọn ngày"
                    style={{ width: 120 }}
                    showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                    value={dueDate}
                    onChange={(date) => setDueDate(date)}
                />
                <Select
                    value={priority}
                    style={{ width: 117 }}
                    onChange={handleChange}
                    popupMatchSelectWidth={false}
                    options={[
                        {
                            value: "P1",
                            label: (
                                <>
                                    <FlagFilled style={{ color: "#ff2121ff" }} /> Ưu tiên 1
                                </>
                            ),
                        },
                        {
                            value: "P2",
                            label: (
                                <>
                                    <FlagFilled style={{ color: "#3651ffff" }} /> Ưu tiên 2
                                </>
                            ),
                        },
                        {
                            value: "P3",
                            label: (
                                <>
                                    <FlagFilled style={{ color: "#fff454ff" }} /> Ưu tiên 3
                                </>
                            ),
                        },
                        {
                            value: "P4",
                            label: (
                                <>
                                    <FlagFilled style={{ color: "#888888ff" }} /> Ưu tiên 4
                                </>
                            ),
                        },
                    ]}
                />
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
                        loading={loading}
                        disabled={loading}
                    >
                        Add task
                    </Button>
                </Space>
            </div>
        </Modal>
    );
};

export default AddTaskModal;