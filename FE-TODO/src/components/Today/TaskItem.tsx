import {
    EditOutlined,
    TagOutlined,
    CommentOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import {
    Typography,
    Checkbox,
    Space,
    Tooltip,
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { TaskEdit } from "./TaskEdit";
import ModalComment from "../Modal/ModalComment";
import { useUpdateTaskCompleted } from "../../hooks/useTasks";
import { ModalAddTaskToLabel } from "../Modal/ModalAddTaskToLabel";

const { Text } = Typography;

export const TaskItem = ({ task, onSave }: { task: any; onSave: (id: string, data: any) => void }) => {
    const { handleUpdateTaskCompleted, loading } = useUpdateTaskCompleted();
    const [editing, setEditing] = useState(false);
    const [openModalComment, setOpenModalComment] = useState(false);
    const [openModalAddToLabel, setOpenModalAddToLabel] = useState(false);
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
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    padding: "12px 0",
                    borderBottom: "1px solid #f0f0f0",
                    position: "relative",
                }}
            >

                <Checkbox
                    checked={task.completed}
                    style={{ marginTop: 4 }}
                    disabled={loading}
                    onChange={(e) =>
                        handleUpdateTaskCompleted(task.id, e.target.checked)
                    } />

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
                                        📅 {dayjs(Number(task.due_date)).format('DD-MM-YYYY HH:mm')}
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
                            <TagOutlined style={{ cursor: "pointer" }} onClick={() => setOpenModalAddToLabel(true)} />
                        </Tooltip>
                        <Tooltip title="Comment">
                            <CommentOutlined onClick={() => setOpenModalComment(true)} style={{ cursor: "pointer" }} />
                        </Tooltip>
                        <Tooltip title="More">
                            <MoreOutlined style={{ cursor: "pointer" }} />
                        </Tooltip>
                    </Space>
                )}
            </div>

            <ModalComment open={openModalComment} taskId={task.id} taskTitle={task.title} onClose={() => setOpenModalComment(false)} />

            <ModalAddTaskToLabel open={openModalAddToLabel}
                onClose={() => setOpenModalAddToLabel(false)}
                onSave={(labels: string[]) => {
                    console.log("Selected labels:", labels);
                }}
                taskId={task.id}
            />


        </>
    );
};
