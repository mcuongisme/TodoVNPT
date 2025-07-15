import React, { useState } from 'react'
import {
    Button,
    Typography,
} from "antd";
import {
    FileDoneOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import AddTaskModal from "../Modal/ModalAddTask";
import { TodayList } from './TodayList';
const { Title } = Typography
export const TodayView = () => {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <div style={{ padding: 24 }}>
            <Title level={3}>Công việc hôm nay</Title>
            <span style={{ color: '#999' }}><FileDoneOutlined /> 2 tasks</span>
            <TodayList />
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
