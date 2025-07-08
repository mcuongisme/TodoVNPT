import React, { useState } from "react";
import {
    Typography,
} from "antd";
import {
    PlusOutlined,
} from "@ant-design/icons";
import AddTaskModal from "../Tasks/ModalAddTask";
import { InboxList } from "./InboxList";

const { Title } = Typography;

export const InboxView: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <div style={{ padding: 24 }}>
            <Title level={3}>Inbox</Title>
            <InboxList />
            <div
                style={{
                    padding: "12px 0",
                    color: "#a81f00",
                    cursor: "pointer",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                }}
                onClick={() => setModalOpen(true)}
            >
                <PlusOutlined />
                Add task
            </div>
            <AddTaskModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};

