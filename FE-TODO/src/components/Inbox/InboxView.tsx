import React, { useState } from "react";
import {
    Button,
    Typography,
} from "antd";
import {
    PlusOutlined,
} from "@ant-design/icons";
import AddTaskModal from "../Modal/ModalAddTask";
import { InboxList } from "./InboxList";

const { Title } = Typography;

export const InboxView: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div style={{ padding: 24 }}>
            <Title level={3}>Hộp thư đến</Title>
            <InboxList />
            <Button
                type="link"
                danger
                icon={<PlusOutlined />}
                onClick={() => setModalOpen(true)}
            >
                Add task
            </Button>
            <AddTaskModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}

            />
        </div>
    );
};

