import React, { useState } from "react";
import {
    Button,
    Empty,
    Typography,
} from "antd";
import {
    PlusOutlined,
} from "@ant-design/icons";
import AddTaskModal from "../Modal/ModalAddTask";
import { LoadData } from "../Common/LoadData";
import { TaskItem } from "../Today/TaskItem";
import { useParams } from "react-router-dom";
import { useGetTaskByLabel } from "../../hooks/useLabels";
const { Title } = Typography;

export const LabelTaskList = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, error, tasks, labelName } = useGetTaskByLabel(id!);
    const [modalOpen, setModalOpen] = useState(false)
    let isEmpty = true;
    if (loading || error) return <LoadData loading={loading} error={error} />;
    if (!tasks || tasks.length === 0) isEmpty = false;

    const handleSave = (id: string, updatedData: any) => {
        console.log("Lưu lại task:", id, updatedData);
    };
    console.log(tasks)
    return (
        <div style={{ padding: 24 }}>

            <Title level={3}>Nhãn: {labelName}</Title>

            {isEmpty ? (
                tasks.map((data: any) => (
                    <TaskItem key={data.id} task={data} onSave={handleSave} />
                ))
            ) : (
                <Empty description="Không có công việc nào" />
            )}

            <Button
                type="link"
                danger
                icon={<PlusOutlined />}
                onClick={() => setModalOpen(true)}
            >
                Add task
            </Button>
            <AddTaskModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}

            />
        </div>
    )
}
