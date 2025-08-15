import { BellOutlined, ClockCircleOutlined, FlagFilled, MoreOutlined, TagOutlined } from "@ant-design/icons";
import {
    Modal, Input, DatePicker, Select, Button, Space, TimePicker,
    Card,
    Divider,
    Dropdown,
    Menu
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useUpdateTask } from "../../hooks/useTasks";

export const TaskEdit = ({ task, onClose, onSave }: any) => {
    const moreMenu = (
        <Menu>
            <Menu.Item icon={<TagOutlined />}>Gán nhãn</Menu.Item>
            <Menu.Item icon={<ClockCircleOutlined />}>Deadline</Menu.Item>
        </Menu>
    );
    const { handleUpdateTask, loading, error } = useUpdateTask();
    const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null);
    const [priority, setPriority] = useState<string>("P4");
    const [form, setForm] = useState({
        title: task?.title || "",
        note: task?.note || "",
        due_date: task?.due_date ? dayjs(task.due_date) : null,
        priority: task?.priority || "4",
        reminder: null,
    });

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title,
                note: task.note,
                due_date: task.due_date ? dayjs(task.due_date) : null,
                priority: task.priority || "4",
                reminder: null,
            });
        }
    }, [task]);

    const handleChange = (field: string, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const updatedTask = {
            title: form.title,
            note: form.note,
            due_date: dueDate ? dueDate.toISOString() : null,
            priority,
            // reminder: form.reminder
        };

        try {
            await handleUpdateTask(task.id, updatedTask);
            onSave({ ...task, ...updatedTask }); // Cập nhật UI local
        } catch (err) {
            console.error("Update task error:", err);
        }
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Input
                placeholder="Tiêu đề"
                value={form.title}
                bordered={false}
                style={{
                    fontSize: 18,
                    fontWeight: 500,
                    padding: 0,
                    marginBottom: 4,
                }}
                onChange={(e) => handleChange("title", e.target.value)}
            />
            <Input.TextArea
                placeholder="Mô tả"
                value={form.note}
                bordered={false}
                onChange={(e) => handleChange("note", e.target.value)}
                rows={2}
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
            <Divider size="small" />
            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    style={{ backgroundColor: "#a81f00", borderColor: "#a81f00" }}
                >
                    Lưu
                </Button>
            </Space>
        </Space>

    );
};
