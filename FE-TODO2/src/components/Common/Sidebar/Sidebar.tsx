import React, { useState } from "react";
import { Layout, Menu, Button, Avatar, Typography, Divider, Tooltip, type MenuProps, Space, Modal } from "antd";
import {
    InboxOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    TagsOutlined,
    CheckCircleOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PlusCircleFilled,
    ProjectOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import styles from "./Sidebar.module.scss"
import AddTaskModal from "../../Tasks/ModalAddTask";
import { Link } from "react-router-dom";
import { ROUTES } from '../../../routes/paths';

const { Sider } = Layout;
const { Text } = Typography;
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'proejects',
        label: 'Dự án của tôi',
        icon: <Avatar size={'small'} icon={<span style={{ fontSize: 18 }}>👤</span>} />,
        children: [
            { key: '5', icon: <ProjectOutlined />, label: 'Option 5' },
            { key: '6', icon: <ProjectOutlined />, label: 'Option 6' },
        ],
    },
];
export const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const toggleCollapse = () => setCollapsed(!collapsed);

    return (
        <Sider
            width={260}
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
            theme="light"
            className={styles.sider}
        >
            <div className={styles.top_sidebar}>
                {!collapsed && (
                    <div className={styles.user_info} >
                        <Avatar size={40} icon={<span style={{ fontSize: 18 }}>👤</span>} />
                        <div style={{ marginLeft: 12 }}>
                            <div style={{ fontWeight: 600 }}>Nguyễn Văn An</div>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                @nguyenvanan
                            </Text>
                        </div>
                    </div>
                )}
                <Tooltip title="Open/Close Sidebar">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={toggleCollapse}
                    />
                </Tooltip>

            </div>
            <Divider />
            <Menu mode="vertical" selectable={false} style={{ border: "none" }} inlineCollapsed={collapsed}>
                <Menu.Item
                    onClick={() => setModalOpen(true)}
                    icon={<PlusCircleFilled
                        style={{ color: '#a81f00', fontSize: '20px' }}
                    />}>
                    {!collapsed && <Text
                        style={{ color: '#a81f00', fontSize: '15px', fontWeight: 'bold' }}>
                        Thêm công việc
                    </Text>}
                </Menu.Item>
                <Menu.Item icon={<SearchOutlined />}>
                    {!collapsed && <>Tìm kiếm<span style={countStyle}>12</span></>}
                </Menu.Item>
                <Menu.Item icon={<InboxOutlined />}>
                    {!collapsed && <><Link to={ROUTES.INBOX}>Hộp thư đến<span style={countStyle}>12</span></Link></>}
                </Menu.Item>
                <Menu.Item icon={<CalendarOutlined />}>
                    {!collapsed && <><Link to={ROUTES.TODAY}>Hôm nay<span style={countStyle}>5</span></Link></>}
                </Menu.Item>
                <Menu.Item icon={<ClockCircleOutlined />}>
                    {!collapsed && <><Link to={ROUTES.UPCOMING}>Sắp tới<span style={countStyle}>7</span></Link></>}
                </Menu.Item>
                <Menu.Item icon={<TagsOutlined />}>
                    {!collapsed && <><Link to={ROUTES.LABEL_FILTER}>Nhãn & bộ lọc<span style={countStyle}>2</span></Link></>}
                </Menu.Item>
                <Menu.Item icon={<CheckCircleOutlined />}>
                    {!collapsed && <><Link to={ROUTES.COMPLETED}>Đã hoàn thành<span style={countStyle}>2</span></Link></>}
                </Menu.Item>
            </Menu>

            <Divider />

            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['proejects']}
                mode="inline"
                inlineCollapsed={collapsed}
                items={items}
            />

            <AddTaskModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            // onSubmit={handleAddTask}
            />
        </Sider>

    );
};

const countStyle: React.CSSProperties = {
    float: "right",
    color: "#999",
};

