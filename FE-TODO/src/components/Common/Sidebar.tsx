import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Menu, Button, Avatar, Typography, Divider, Tooltip, type MenuProps, Space, Modal, ConfigProvider } from "antd";
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
    BellOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import styles from "./Sidebar.module.scss"
import AddTaskModal from "../Modal/ModalAddTask";
import { Link } from "react-router-dom";
import { ROUTES } from '../../routes/paths';
import { UserInfo } from "./UserInfo";
import { ModalSearch } from "../Modal/ModalSearch";
import { useGetProjects } from '../../hooks/useProject';
import { ModalAddProject } from "../Modal/ModalAddProject";
const keyMap: Record<string, string> = {
    "/inbox": "inbox",
    "/today": "today",
    "/upcoming": "upcoming",
    "/labels-filters": "labels-filters",
    "/completed": "completed",
};

const { Sider } = Layout;
const { Text } = Typography;
type MenuItem = Required<MenuProps>['items'][number];

export const Sidebar: React.FC = () => {
    const location = useLocation();
    const path = location.pathname;
    const { data } = useGetProjects();
    const [modalOpenAddProject, setModalOpenAddProject] = useState(false)
    const [collapsed, setCollapsed] = useState(false);
    const [modalOpenAddTask, setModalOpenAddTask] = useState(false)

    const [modalOpenSearch, setModalOpenSearch] = useState(false)

    const toggleCollapse = () => setCollapsed(!collapsed);
    const items: MenuItem[] = [
        {
            key: 'projects',
            label: 'Dự án của tôi',
            icon: <Avatar size={'small'} icon={<span style={{ fontSize: 18 }}>👤</span>} />,
            children: [
                {
                    key: 'add-new-group',
                    onClick: () => { setModalOpenAddProject(true) },
                    icon: <PlusOutlined style={{ color: '#a81f00', fontWeight: 'bolder' }} />,
                    label: <span style={{ color: '#a81f00', fontWeight: 'bolder' }}>Thêm nhóm mới</span>,
                },
                ...(data?.map((project: any) => ({
                    key: project.id,
                    icon: <ProjectOutlined />,
                    label: project.name,
                })) || []),

            ],
        },
    ];
    const itemsMainMenu = [
        {
            key: 'add-task',
            icon: <PlusCircleFilled style={{ color: '#a81f00', fontSize: '20px' }} />,
            title: 'Thêm công việc',
            onClick: () => setModalOpenAddTask(true),
            label: !collapsed && (
                <Text style={{ color: '#a81f00', fontSize: '15px', fontWeight: 'bold' }}>
                    Thêm công việc
                </Text>
            ),
        },
        {
            key: 'search',
            icon: <SearchOutlined />,
            title: 'Tìm kiếm công việc',
            onClick: () => setModalOpenSearch(true),
            label: !collapsed && (
                <>
                    Tìm kiếm<span style={countStyle}>12</span>
                </>
            ),
        },
        {
            key: 'inbox',
            icon: <InboxOutlined />,
            title: 'Hộp thư đến',
            label: (
                <Link to={ROUTES.INBOX}>
                    {!collapsed && <>Hộp thư đến<span style={countStyle}>12</span></>}
                </Link>
            ),
        },
        {
            key: 'today',
            icon: <CalendarOutlined />,
            title: 'Hôm nay',
            label: (
                <Link to={ROUTES.TODAY}>
                    {!collapsed && <>Hôm nay<span style={countStyle}>5</span></>}
                </Link>
            ),
        },
        {
            key: 'upcoming',
            icon: <ClockCircleOutlined />,
            title: 'Sắp tới',
            label: (
                <Link to={ROUTES.UPCOMING}>
                    {!collapsed && <>Sắp tới<span style={countStyle}>7</span></>}
                </Link>
            ),
        },
        {
            key: 'labels-filters',
            icon: <TagsOutlined />,
            title: 'Nhãn & bộ lọc',
            label: (
                <Link to={ROUTES.LABEL_FILTER}>
                    {!collapsed && <>Nhãn & bộ lọc<span style={countStyle}>2</span></>}
                </Link>
            ),
        },
        {
            key: 'completed',
            icon: <CheckCircleOutlined />,
            title: 'Đã hoàn thành',
            label: (
                <Link to={ROUTES.COMPLETED}>
                    {!collapsed && <>Đã hoàn thành<span style={countStyle}>2</span></>}
                </Link>
            ),
        },
    ];



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
                    <UserInfo />
                )}
                <div className={styles.button__right}>
                    <Tooltip title="Open Notification">
                        <Button
                            type="text"
                            icon={<BellOutlined />}
                            href={ROUTES.NOTIFICATIONS}
                        />
                    </Tooltip>
                    <Tooltip title="Open/Close Sidebar">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={toggleCollapse}
                        />
                    </Tooltip>
                </div>


            </div>
            <Divider />
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#a81f00', // đỏ - dùng cho selected
                    },
                }}
            >
                <Menu
                    className={styles.menuSidebar}
                    mode="inline"
                    selectable={false}
                    style={{ border: 'none' }}
                    inlineCollapsed={collapsed}
                    selectedKeys={[keyMap[path] || ""]}
                    items={itemsMainMenu}
                />
                <Divider />
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['projects']}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </ConfigProvider>






            <AddTaskModal
                open={modalOpenAddTask}
                onClose={() => setModalOpenAddTask(false)}
            />

            <ModalSearch
                open={modalOpenSearch}
                onClose={() => setModalOpenSearch(false)}
            // onSubmit={handleAddTask}
            />

            <ModalAddProject
                open={modalOpenAddProject}
                onClose={() => setModalOpenAddProject(false)}
            />
        </Sider >

    );
};

const countStyle: React.CSSProperties = {
    float: "right",
    color: "#999",
};

