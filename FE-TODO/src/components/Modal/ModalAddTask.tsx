import React, { useState } from "react";
import {
    Modal,
    Input,
    Button,
    Space,
    Dropdown,
    Menu,
    DatePicker,
    message,
    Tag,
    Select,
} from "antd";

import type { ModalProps } from "../../types/index";
import dayjs from "dayjs";
import { useCreateTask } from "../../hooks/useTasks";
import { useNotificationContext } from "../Common/NotificationProvider";
import { useGetProject } from "../../hooks/useProject";
import { useParams } from "react-router-dom";
import { useLabels } from "../../hooks/useLabels";
const { TextArea } = Input;
const getDateFilterFromDueDate = (dueDate?: string) => {
    if (!dueDate) return "future";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfToday = today.getTime();
    const endOfToday = startOfToday + 24 * 60 * 60 * 1000 - 1;
    const due = new Date(dueDate).getTime();

    if (due < startOfToday) return "overdue";
    if (due >= startOfToday && due <= endOfToday) return "today";
    return "future";
};


interface Label {
    id: number;
    name: string;
    color?: string;
}

const AddTaskModal: React.FC<ModalProps> = ({ open, onClose }) => {
    const { handleCreateTask, loading, error } = useCreateTask();
    const { labels = [] } = useLabels();
    const { showNotification } = useNotificationContext();

    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null);
    const [selectedLabels, setSelectedLabels] = useState<number[]>([]);

    const { id: projectId } = useParams<{ id: string }>();
    const { data: project } = useGetProject(projectId!);

    const handleSelectLabel = (value: number) => {
        setSelectedLabels((prev) => (prev.includes(value) ? prev : [...prev, value]));
        setSelectValue(undefined);
    };

    const handleRemoveLabel = (id: number) => {
        setSelectedLabels((prev) => prev.filter((x) => x !== id));
    };

    const [selectValue, setSelectValue] = useState<number | undefined>(undefined);

    const handleSubmit = async () => {
        if (!title.trim()) {
            message.error("Please enter a task title.");
            return;
        }

        const due_date = dueDate ? dueDate.format("YYYY-MM-DD HH:mm:ss") : undefined;

        const taskData = {
            title: title.trim(),
            note: note.trim() || undefined,
            due_date,
            project_id: projectId ? projectId : undefined,
            labelIds: selectedLabels,
        };

        const dateFilter = getDateFilterFromDueDate(due_date);

        try {
            await handleCreateTask(taskData, dateFilter);
            showNotification("Thêm công việc thành công", "Công việc đã được thêm vào danh sách", "success");
            setTitle("");
            setNote("");
            setDueDate(null);
            setSelectedLabels([]);
            setSelectValue(undefined);
            onClose();
        } catch (e) {
            showNotification("Thêm công việc thất bại", error?.message || "Vui lòng thử lại sau", "error");
        }
    };

    return (
        <Modal open={open} onCancel={onClose} footer={null} closable={false} width={500} style={{ top: 100 }}>
            <Input
                placeholder="Tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                bordered={false}
                style={{ fontSize: 18, fontWeight: 500, padding: 0, marginBottom: 4 }}
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
                    placeholder="Chọn ngày"
                    style={{ width: 200 }}
                    showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                    value={dueDate}
                    onChange={(date) => setDueDate(date)}
                    disabledDate={(cur) => !!cur && cur < dayjs().startOf("day")}
                />

                {/* Dropdown: mỗi lần chọn 1, thêm vào danh sách */}
                <Select<number>
                    style={{ width: 200 }}
                    placeholder="Chọn label"
                    value={selectValue}
                    onChange={(v) => handleSelectLabel(v)}
                    // ẩn hoặc disable những label đã chọn để tránh trùng
                    options={labels.map((l: Label) => ({
                        label: l.name,
                        value: l.id,
                        disabled: selectedLabels.includes(l.id),
                    }))}
                    allowClear
                    onClear={() => setSelectValue(undefined)}
                />
            </Space>

            {/* Thanh các label đã chọn */}
            <div style={{ marginBottom: 16 }}>
                {selectedLabels.map((id) => {
                    const label = (labels as Label[]).find((l) => l.id === id);
                    if (!label) return null;
                    return (
                        <Tag
                            key={id}
                            closable
                            onClose={(e) => {
                                e.preventDefault(); // đảm bảo không auto-remove DOM, mình tự xử lý
                                handleRemoveLabel(id);
                            }}
                            color="blue"
                            style={{ marginBottom: 4 }}
                        >
                            {label.name}
                        </Tag>
                    );
                })}
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #f0f0f0",
                    paddingTop: 12,
                }}
            >
                {project && <Tag color="blue">Nhóm: {project.name}</Tag>}

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
//  // const handleChange = (value: string) => {
//     //     setPriority(value);
//     // };
//     {/* <Select
//                     value={priority}
//                     style={{ width: 117 }}
//                     onChange={handleChange}
//                     popupMatchSelectWidth={false}
//                     options={[
//                         {
//                             value: "P1",
//                             label: (
//                                 <>
//                                     <FlagFilled style={{ color: "#ff2121ff" }} /> Ưu tiên 1
//                                 </>
//                             ),
//                         },
//                         {
//                             value: "P2",
//                             label: (
//                                 <>
//                                     <FlagFilled style={{ color: "#3651ffff" }} /> Ưu tiên 2
//                                 </>
//                             ),
//                         },
//                         {
//                             value: "P3",
//                             label: (
//                                 <>
//                                     <FlagFilled style={{ color: "#fff454ff" }} /> Ưu tiên 3
//                                 </>
//                             ),
//                         },
//                         {
//                             value: "P4",
//                             label: (
//                                 <>
//                                     <FlagFilled style={{ color: "#888888ff" }} /> Ưu tiên 4
//                                 </>
//                             ),
//                         },
//                     ]}
//                 /> */}
//                 {/* <Button icon={<BellOutlined />}>Reminders</Button> */}