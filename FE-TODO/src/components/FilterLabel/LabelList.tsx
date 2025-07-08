import React from 'react'
import type { LabelItem } from '../../types';
import { Collapse, Typography, Tooltip, Divider } from "antd";
import {
    PlusOutlined,
    TagOutlined,
    FireOutlined,
} from "@ant-design/icons";
const { Panel } = Collapse;
const { Text } = Typography;

const labels: LabelItem[] = [
    { name: "vccv", color: "#c471ab" },
    { name: "vccv", color: "#c471ab" },
];
export const LabelList = () => {
    return (
        <div>

            {labels.map((label, idx) => (
                <>
                    <div
                        key={idx}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "5px 20px",
                            gap: 8,

                        }}
                    >
                        <TagOutlined style={{ color: label.color || "#999" }} />
                        <span>{label.name}</span>
                    </div>
                    <Divider size='small' />
                </>

            ))}
        </div>
    )
}
