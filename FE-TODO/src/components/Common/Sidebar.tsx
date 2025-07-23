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

const { Sider } = Layout;
const { Text } = Typography;
type MenuItem = Required<MenuProps>['items'][number];

export const Sidebar: React.FC = () => {
    const { data } = useGetProjects();
    const [modalOpenAddProject, setModalOpenAddProject] = useState(false)
    const items: MenuItem[] = [
        {
            key: 'projects',
            label: 'Dự án của tôi',
            icon: <Avatar size={'small'} icon={<span style={{ fontSize: 18 }}>👤</span>} />,
            children: [
                ...(data?.map((project: any) => ({
                    key: project.id,
                    icon: <ProjectOutlined />,
                    label: project.name,
                })) || []),
                {
                    key: 'add-new-group',
                    onClick: () => { setModalOpenAddProject(true) },
                    icon: <PlusOutlined style={{ color: '#1890ff' }} />,
                    label: <span style={{ color: '#1890ff' }}>Thêm nhóm mới</span>,
                }
            ],
        },
    ];
    console.log("items", data);

    const [collapsed, setCollapsed] = useState(false);
    const [modalOpenAddTask, setModalOpenAddTask] = useState(false)

    const [modalOpenSearch, setModalOpenSearch] = useState(false)

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
            <Menu mode="vertical" selectable={false} style={{ border: "none" }} inlineCollapsed={collapsed}>
                <Menu.Item
                    key={"add-task"}
                    onClick={() => setModalOpenAddTask(true)}
                    icon={<PlusCircleFilled
                        style={{ color: '#a81f00', fontSize: '20px' }}
                    />}
                    title="Thêm công việc">
                    {!collapsed && <Text
                        style={{ color: '#a81f00', fontSize: '15px', fontWeight: 'bold' }}>
                        Thêm công việc
                    </Text>}
                </Menu.Item>
                <Menu.Item
                    key={"search"}
                    onClick={() => setModalOpenSearch(true)}
                    icon={<SearchOutlined />}
                    title="Tìm kiếm công việc">
                    {!collapsed && <>Tìm kiếm<span style={countStyle}>12</span></>}
                </Menu.Item>

                <Menu.Item icon={<InboxOutlined />} title="Hộp thư đến" key={"inbox"}>
                    <Link to={ROUTES.INBOX}>{!collapsed && <>Hộp thư đến<span style={countStyle}>12</span></>}</Link>
                </Menu.Item>

                <Menu.Item icon={<CalendarOutlined />} title="Hôm nay" key={"today"}>
                    <Link to={ROUTES.TODAY}>{!collapsed && <> Hôm nay<span style={countStyle}>5</span></>}</Link>
                </Menu.Item>

                <Menu.Item icon={<ClockCircleOutlined />} title="Sắp tới" key={"upcoming"}>
                    <Link to={ROUTES.UPCOMING}>{!collapsed && <>Sắp tới<span style={countStyle}>7</span></>}</Link>
                </Menu.Item>
                <Menu.Item icon={<TagsOutlined />} title="Nhãn & bộ lọc" key={"label-filter"}>
                    <Link to={ROUTES.LABEL_FILTER}>{!collapsed && <>Nhãn & bộ lọc<span style={countStyle}>2</span></>}</Link>
                </Menu.Item>

                <Menu.Item icon={<CheckCircleOutlined />} title="Đã hoàn thành" key={"completed"}>
                    <Link to={ROUTES.COMPLETED}>{!collapsed && <>Đã hoàn thành<span style={countStyle}>2</span></>}</Link>
                </Menu.Item>
            </Menu>

            <Divider />

            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['projects']}
                mode="inline"
                inlineCollapsed={collapsed}
                items={items}
            />

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

