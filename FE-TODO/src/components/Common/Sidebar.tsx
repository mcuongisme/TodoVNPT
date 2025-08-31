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
    AliwangwangOutlined,
} from "@ant-design/icons";
import styles from "./Sidebar.module.scss"
import AddTaskModal from "../Modal/ModalAddTask";
import { Link } from "react-router-dom";
import { ROUTES } from '../../routes/paths';
import { UserInfo } from "./UserInfo";
import { ModalSearch } from "../Modal/ModalSearch";
import { useGetProjects } from '../../hooks/useProject';
import { ModalAddProject } from "../Modal/ModalAddProject";
import { ButtonNotification } from "../Notification/ButtonNotification";
import { useGetCurrentUser } from "../../hooks/useAuth";
const keyMap: Record<string, string> = {
    "/inbox": "inbox",
    "/today": "today",
    "/upcoming": "upcoming",
    "/labels-filters": "labels-filters",
    "/completed": "completed",
};
const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

export const Sidebar: React.FC = () => {
    const { user } = useGetCurrentUser()
    const location = useLocation();
    const path = location.pathname;
    const { projects } = useGetProjects();
    const [modalOpenAddProject, setModalOpenAddProject] = useState(false)
    const [collapsed, setCollapsed] = useState(false);
    const [modalOpenAddTask, setModalOpenAddTask] = useState(false)

    const [modalOpenSearch, setModalOpenSearch] = useState(false)

    const toggleCollapse = () => setCollapsed(!collapsed);
    const items: MenuItem[] = [];

    if (user?.role === "STAFF" || user?.role === "CUSTOMER") {
        items.push({
            key: "projects",
            label: "Dự án hỗ trợ",
            icon: <Avatar size={"small"} icon={<span style={{ fontSize: 18 }}>👤</span>} />,
            children: [
                {
                    key: "add-new-group",
                    onClick: () => {
                        setModalOpenAddProject(true);
                    },
                    icon: <PlusOutlined style={{ color: "#a81f00", fontWeight: "bolder" }} />,
                    label: <span style={{ color: "#a81f00", fontWeight: "bolder" }}>Thêm nhóm mới</span>,
                },
                ...(projects?.map((project: any) => ({
                    key: project.id,
                    icon: <ProjectOutlined />,
                    label: (
                        <Link to={ROUTES.PROJECT.DETAIL(project.id)}>
                            {project.name}
                        </Link>
                    ),
                })) || []),
            ],
        });
    }
    const baseItems: MenuItem[] = [
        {
            key: "today",
            icon: <CalendarOutlined />,
            title: "Hôm nay",
            label: <Link to={ROUTES.TODAY}>{!collapsed && <>Công việc hôm nay</>}</Link>,
        },
        {
            key: "upcoming",
            icon: <ClockCircleOutlined />,
            title: "Sắp tới",
            label: <Link to={ROUTES.UPCOMING}>{!collapsed && <>Sắp tới</>}</Link>,
        },

    ]

    const labelItem: MenuItem[] = [
        {
            key: "completed",
            icon: <CheckCircleOutlined />,
            title: "Đã hoàn thành",
            label: <Link to={ROUTES.COMPLETED}>{!collapsed && <>Đã hoàn thành</>}</Link>,
        },
        {
            key: "labels-filters",
            icon: <TagsOutlined />,
            title: "Nhãn",
            label: <Link to={ROUTES.LABEL_FILTER}>{!collapsed && <>Nhãn</>}</Link>,
        }
    ]

    const registerEmployeeItem: MenuItem = {
        key: "register-employee",
        icon: <AliwangwangOutlined />,
        title: "Đăng kí tài khoản cho nhân viên",
        label: <Link to={ROUTES.ACCOUNT.REGISTER_EMPLOYEE}>{!collapsed && <>Đăng kí cho nhân viên</>}</Link>,
    }

    let itemsMainMenu: MenuItem[] = [...baseItems]

    if (user?.role === "CUSTOMER" || user?.role === "STAFF") {
        itemsMainMenu.splice(2, 0, ...labelItem)
    } else if (user?.role === "ADMIN") {
        itemsMainMenu.splice(2, 0, registerEmployeeItem)
    }
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
                    <ButtonNotification />
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

