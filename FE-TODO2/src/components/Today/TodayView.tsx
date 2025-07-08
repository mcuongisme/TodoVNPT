import React, { useState } from 'react'
import {
    Typography,
} from "antd";
import {
    FileDoneOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import AddTaskModal from "../Tasks/ModalAddTask";
import { TodayList } from './TodayList';
const { Title } = Typography
export const TodayView = () => {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <div style={{ padding: 24 }}>
            <Title level={3}>Công việc hôm nay</Title>
            <span style={{ color: '#999' }}><FileDoneOutlined /> 2 tasks</span>
            <TodayList />
            <div
                style={{
                    padding: "12px 0",
                    color: "#a81f00",
                    cursor: "pointer",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                }}
                onClick={() => setModalOpen(true)}
            >
                <PlusOutlined />
                Add task
            </div>
            <AddTaskModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    )
}
