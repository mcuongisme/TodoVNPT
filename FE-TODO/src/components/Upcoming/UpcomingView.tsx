import React from 'react'
import {
    Typography,
} from "antd";
import {
    FileDoneOutlined,
} from "@ant-design/icons";
import { UpcomingCalender } from './UpcomingCalender';
const { Title } = Typography
export const UpcomingView = () => {
    return (
        <div style={{ padding: 24 }}>
            <Title level={3}>Công việc sắp tới</Title>
            <UpcomingCalender />
        </div>
    )
}
