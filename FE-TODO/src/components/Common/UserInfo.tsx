import { Avatar, Typography } from 'antd'
import React from 'react'
const { Text } = Typography;
import styles from "./Sidebar.module.scss"

export const UserInfo = () => {
    return (
        <div className={styles.user_info} >
            <Avatar size={40} icon={<span style={{ fontSize: 18 }}>👤</span>} />
            <div style={{ marginLeft: 12 }}>
                <div style={{ fontWeight: 600 }}>An</div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                    @nguyenvanan
                </Text>
            </div>
        </div>
    )
}
