import { Modal, Input, Divider, List } from "antd";
import {
    HomeOutlined,
    InboxOutlined,
    CalendarOutlined,
    TagsOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import React from 'react'
import type { ModalProps } from "../../types";
const recentItems = [
    { icon: "#️⃣", title: "Getting Started 👋", subtitle: "My Projects" },
    { icon: "⭕", title: "zx" },
    { icon: "📅", title: "Today" },
];

const navItems = [
    { icon: <HomeOutlined />, title: "Go to home", shortcut: "G then H" },
    { icon: <InboxOutlined />, title: "Go to Inbox", shortcut: "G then I" },
    { icon: <CalendarOutlined />, title: "Go to Today", shortcut: "G then T" },
    { icon: <ClockCircleOutlined />, title: "Go to Upcoming", shortcut: "G then U" },
    { icon: <TagsOutlined />, title: "Go to Filters & Labels", shortcut: "G then V" },
];
export const ModalSearch: React.FC<ModalProps> = ({ open, onClose }) => {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            closable={false}
            width={640}
            style={{ maxHeight: "70vh", overflowY: "auto", borderRadius: 12 }}
        >
            <Input
                placeholder="Search or type a command..."
                style={{ marginBottom: 20, borderRadius: 6 }}
                bordered={false}
                allowClear
            />
            <Divider size="small" />

            <div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Recently viewed</div>
                <List
                    itemLayout="horizontal"
                    dataSource={recentItems}
                    split={false}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<span style={{ fontSize: 18 }}>{item.icon}</span>}
                                title={<a>{item.title}</a>}
                                description={item.subtitle}
                            />
                        </List.Item>
                    )}
                />
            </div>


            <div>
                <Divider size="small" />
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Navigation</div>
                <List
                    itemLayout="horizontal"
                    dataSource={navItems}
                    renderItem={(item) => (
                        <List.Item
                            actions={[<span style={{ fontFamily: "monospace", fontSize: 12 }}>{item.shortcut}</span>]}
                        >
                            <List.Item.Meta avatar={item.icon} title={item.title} />
                        </List.Item>
                    )}
                />
            </div>
        </Modal>
    );
}
