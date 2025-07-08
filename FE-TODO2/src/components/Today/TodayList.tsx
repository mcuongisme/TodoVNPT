import {
    EditOutlined,
    TagOutlined,
    CommentOutlined,
    MoreOutlined,
    DragOutlined,
} from "@ant-design/icons"; import { Checkbox, Space, Tooltip, Typography } from 'antd';
import React from 'react'
import type { Task } from "../../types";
const { Text } = Typography;
const mockTasks: Task[] = [
    {
        id: 1,
        title: "saa",
        description: "saaá",
        dueDate: "Monday",
        completed: false,
    },
    {
        id: 2,
        title: "sd",
        description: "ds",
        completed: false,
    },
];
export const TodayList = () => {
    return (
        <div>
            {mockTasks.map((task) => (
                <div
                    key={task.id}
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "12px 0",
                        borderBottom: "1px solid #f0f0f0",
                        position: "relative",
                    }}
                >
                    <div style={{ paddingTop: 6, paddingRight: 8 }}>
                        <DragOutlined style={{ color: "#ccc", cursor: "move" }} />
                    </div>

                    <Checkbox checked={task.completed} style={{ marginTop: 4 }} />

                    <div style={{ flex: 1, marginLeft: 12 }}>
                        <Text strong>{task.title}</Text>
                        <br />
                        <Text type="secondary">{task.description}</Text>

                        {task.dueDate && (
                            <div style={{ marginTop: 4 }}>
                                <Text type="secondary" style={{ color: "#a81f00" }}>
                                    📅 {task.dueDate}
                                </Text>
                            </div>
                        )}
                    </div>

                    <Space style={{ marginLeft: "auto" }}>
                        <Tooltip title="Edit">
                            <EditOutlined style={{ cursor: "pointer" }} />
                        </Tooltip>
                        <Tooltip title="Tag">
                            <TagOutlined style={{ cursor: "pointer" }} />
                        </Tooltip>
                        <Tooltip title="Comment">
                            <CommentOutlined style={{ cursor: "pointer" }} />
                        </Tooltip>
                        <Tooltip title="More">
                            <MoreOutlined style={{ cursor: "pointer" }} />
                        </Tooltip>
                    </Space>
                </div>
            ))}
        </div>
    )
}
