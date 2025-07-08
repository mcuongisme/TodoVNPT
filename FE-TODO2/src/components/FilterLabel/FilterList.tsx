import React from 'react'
import { Collapse, Typography, Badge, Space, Tooltip, Divider } from "antd";
import {
    PlusOutlined,
    TagOutlined,
    FireOutlined,
} from "@ant-design/icons";
import type { FilterItem } from '../../types';
const { Panel } = Collapse;
const { Text } = Typography;

const filters: FilterItem[] = [
    { name: "Assigned to me" },
    { name: "Priority 1", usedCount: 2 },
];
export const FilterList = () => {
    return (
        <div>
            {filters.map((filter, idx) => (
                <>
                    <div
                        key={idx}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "6px 20px",
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
                    <Divider size='small' />
                </>

            ))}
        </div >
    )
}
