import React from 'react'
import { Collapse, Dropdown, Space, Typography, type MenuProps } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { CompletedList } from './CompletedList';

const { Title } = Typography;
const items: MenuProps['items'] = [
    {
        label: (
            <a href="https://www.antgroup.com" rel="noopener noreferrer">
                1st menu item
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a href="https://www.aliyun.com" rel="noopener noreferrer">
                2nd menu item
            </a>
        ),
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];
export const CompletedView = () => {
    return (
        <div style={{ padding: 24 }}>

            <Title level={3}>
                <Space>
                    Hoạt động:
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()} style={{ color: 'black' }}>
                            <Space>
                                Tất cả dự án
                                <DownOutlined style={{ fontSize: 15 }} />
                            </Space>
                        </a>
                    </Dropdown>
                </Space>
            </Title>

            <CompletedList />

        </div>

    )
}
