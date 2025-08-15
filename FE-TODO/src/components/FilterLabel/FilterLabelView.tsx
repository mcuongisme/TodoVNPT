import React, { useState } from "react";
import { Collapse, Typography, Badge, Space, Tooltip } from "antd";
import { FilterList } from "./FilterList";
import { LabelList } from "./LabelList";
import { PlusOutlined } from "@ant-design/icons";
import { ModalAddLabel } from "../Modal/ModalAddLabel";

const { Text, Title } = Typography;

export const LabelFilter: React.FC = () => {
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const items = [
        {
            key: "labels",
            label: <Text strong>Nhãn</Text>,
            children: <LabelList />,
            extra: (
                <Tooltip title="Add label">
                    <PlusOutlined style={{ fontSize: 14 }} onClick={handleOpen} />
                </Tooltip>
            ),
        },
    ];

    return (
        <>
            <div style={{ padding: 24 }}>
                <Title level={3}>Danh sách nhãn</Title>
                <Collapse ghost defaultActiveKey={["filters", "labels"]} items={items} />
            </div>
            <ModalAddLabel open={open} onClose={onClose} />
        </>
    );
};
