import React from "react";
import { Collapse, Typography, Badge, Space, Tooltip } from "antd";
import {
    PlusOutlined,
    TagOutlined,
    FireOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
const { Text } = Typography;

interface FilterItem {
    name: string;
    usedCount?: number;
}

interface LabelItem {
    name: string;
    color?: string;
}

const filters: FilterItem[] = [
    { name: "Assigned to me" },
    { name: "Priority 1", usedCount: 2 },
];

const labels: LabelItem[] = [
    { name: "vccv", color: "#c471ab" },
];

export const LabelFilter: React.FC = () => {
    return (
        <div style={{ padding: "12px 16px" }}>
            <Collapse ghost defaultActiveKey={["filters", "labels"]}>
                {/* Filters Panel */}
                <Panel
                    header={
                        <Space>
                            <Text strong>Filters</Text>
                            <Badge count="2/3" style={{ backgroundColor: "#d9d9d9", color: "#333" }} />
                        </Space>
                    }
                    key="filters"
                    extra={
                        <Tooltip title="Add filter">
                            <PlusOutlined style={{ fontSize: 14 }} />
                        </Tooltip>
                    }
                >
                    {filters.map((filter, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "6px 0",
                            }}
                        >
                            <Space>
                                <FireOutlined style={{ color: "#bfbfbf" }} />
                                <span>{filter.name}</span>
                            </Space>
                            {filter.usedCount ? (
                                <span style={{ color: "#a81f00", fontSize: 13 }}>{filter.usedCount}</span>
                            ) : null}
                        </div>
                    ))}
                </Panel>

                {/* Labels Panel */}
                <Panel
                    header={<Text strong>Labels</Text>}
                    key="labels"
                    extra={
                        <Tooltip title="Add label">
                            <PlusOutlined style={{ fontSize: 14 }} />
                        </Tooltip>
                    }
                >
                    {labels.map((label, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "6px 0",
                                gap: 8,
                            }}
                        >
                            <TagOutlined style={{ color: label.color || "#999" }} />
                            <span>{label.name}</span>
                        </div>
                    ))}
                </Panel>
            </Collapse>
        </div>
    );
};

