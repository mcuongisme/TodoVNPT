import React from "react";
import { Collapse, Typography, Badge, Space, Tooltip } from "antd";

import { FilterList } from "./FilterList";
import { LabelList } from "./LabelList";
import { PlusOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
const { Text, Title } = Typography;

export const LabelFilter: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Title level={3}>Inbox</Title>
            <Collapse ghost defaultActiveKey={["filters", "labels"]}>
                <Panel
                    header={
                        <Space>
                            <Text strong>Filters</Text>
                        </Space>
                    }
                    key="filters"
                    extra={
                        <Tooltip title="Add filter">
                            <PlusOutlined style={{ fontSize: 14 }} />
                        </Tooltip>
                    }
                >
                    <FilterList />
                </Panel>

                <Panel
                    header={<Text strong>Labels</Text>}
                    key="labels"
                    extra={
                        <Tooltip title="Add label">
                            <PlusOutlined style={{ fontSize: 14 }} />
                        </Tooltip>
                    }
                >
                    <LabelList />
                </Panel>


            </Collapse>
        </div>

    );
};

