import React, { useState } from 'react'
import {
    Button,
    Divider,
    Typography,
} from "antd";
import {
    PlusOutlined,
} from "@ant-design/icons";
import { TodayList } from './TodayList';
const { Title } = Typography
export const TodayView = () => {
    // const [modalOpen, setModalOpen] = useState(false)
    return (
        <div style={{ padding: 24 }}>
            <Title level={3}>Công việc trễ</Title>
            <TodayList dateFilter="overdue" />
            <Divider />
            <Title level={3}>Công việc hôm nay</Title>
            <TodayList dateFilter="today" />
            <Divider />
            {/* <Button
                type="link"
                danger
                icon={<PlusOutlined />}
                onClick={() => setModalOpen(true)}
            >
                Add task
            </Button> */}
        </div>
    )
}
