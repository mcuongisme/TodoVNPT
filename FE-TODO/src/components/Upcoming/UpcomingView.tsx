import React from 'react'
import {
    Typography,
} from "antd";

import { TodayList } from '../Today/TodayList';
const { Title } = Typography
export const UpcomingView = () => {
    return (
        <div style={{ padding: 24 }}>
            <Title level={3}>Công việc sắp tới</Title>
            <TodayList dateFilter="future" />
        </div>
    )
}
