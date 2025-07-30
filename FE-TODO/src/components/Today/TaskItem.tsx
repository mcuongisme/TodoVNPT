import {
    EditOutlined,
    TagOutlined,
    CommentOutlined,
    MoreOutlined,
    DragOutlined,
    CheckOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import {
    Typography,
    Checkbox,
    Input,
    DatePicker,
    Button,
    Space,
    Tooltip,
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { TaskEdit } from "./TaskEdit";

const { Text } = Typography;

export const TaskItem = ({ task, onSave }: { task: any; onSave: (id: string, data: any) => void }) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        title: task.title,
        note: task.note,
        due_date: task.due_date ? dayjs(task.due_date) : null,
    });

    const handleChange = (field: string, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(task.id, form);
        setEditing(false);
    };

    const handleCancel = () => {
        setForm({
            title: task.title,
            note: task.note,
            due_date: task.due_date ? dayjs(task.due_date) : null,
        });
        setEditing(false);
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "flex-start",
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
                position: "relative",
            }}
        >

            <Checkbox checked={task.completed} style={{ marginTop: 4 }} disabled />

            <div style={{ flex: 1, marginLeft: 12 }}>
                {editing ? (
                    <TaskEdit
                        task={task}
                        open={editing}
                        onClose={() => setEditing(false)}
                        onSave={(updatedData: any) => {
                            handleSave();
                            setForm(updatedData);
                        }} />

                ) : (
                    <>
                        <Text strong>{task.title}</Text>
                        <br />
                        <Text type="secondary">{task.note}</Text>
                        {task.due_date && (
                            <div style={{ marginTop: 4 }}>
                                <Text type="secondary" style={{ color: "#a81f00" }}>
                                    📅 {task.due_date}
                                </Text>
                            </div>
                        )}
                    </>
                )}
            </div>

            {!editing && (
                <Space style={{ marginLeft: "auto" }}>
                    <Tooltip title="Edit">
                        <EditOutlined style={{ cursor: "pointer" }} onClick={() => setEditing(true)} />
                    </Tooltip>
                    <Tooltip title="Tag">
                        <TagOutlined style={{ cursor: "pointer" }} />
                    </Tooltip>
                    <Tooltip title="Comment">
                        <CommentOutlined style={{ cursor: "pointer" }} />
                    </Tooltip>
                    <Tooltip title="More">
                        <MoreOutlined style={{ cursor: "pointer" }} />
                    </Tooltip>
                </Space>
            )}
        </div>
    );
};
