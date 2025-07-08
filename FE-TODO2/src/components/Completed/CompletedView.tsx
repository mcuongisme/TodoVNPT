import React from 'react'
import { Collapse, Dropdown, Space, Typography, type MenuProps } from "antd";
import { DownOutlined } from '@ant-design/icons';

const { Title } = Typography;
const items: MenuProps['items'] = [
    {
        label: (
            <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
                1st menu item
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
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
            <Title level={3}>Activity:

                <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Click me
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </Title>

        </div>

    )
}
