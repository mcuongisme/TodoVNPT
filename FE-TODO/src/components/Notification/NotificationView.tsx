import { Segmented, Typography } from 'antd';
import React, { useState } from 'react'
import { NotificationList } from './NotificationList';
const { Title } = Typography;

export const NotificationView = () => {
    const [tab, setTab] = useState<string>("Tất cả")
    return (
        <div style={{ padding: 24 }}>
            <Title level={3}>Thông báo</Title>
            <Segmented
                options={["Tất cả", "Chưa đọc"]}
                value={tab}
                onChange={(value) => setTab(value as string)}
                size="large"
                style={{ backgroundColor: "#e7e7e7", margin: "10px" }}
            />
            <NotificationList />
        </div>
    )
}
