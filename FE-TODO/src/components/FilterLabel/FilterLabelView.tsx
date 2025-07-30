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
            key: "filters",
            label: (
                <Space>
                    <Text strong>Filters</Text>
                </Space>
            ),
            children: <FilterList />,
            extra: (
                <Tooltip title="Add filter">
                    <PlusOutlined style={{ fontSize: 14 }} />
                </Tooltip>
            ),
        },
        {
            key: "labels",
            label: <Text strong>Labels</Text>,
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
                <Title level={3}>Filters & Labels</Title>
                <Collapse ghost defaultActiveKey={["filters", "labels"]} items={items} />
            </div>
            <ModalAddLabel open={open} onClose={onClose} />
        </>
    );
};
