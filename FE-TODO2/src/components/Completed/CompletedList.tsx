import React from 'react'
import { Typography, Avatar, Space, Divider } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import type { TaskGroup } from '../../types';
const { Text, Link } = Typography;

const mockData: TaskGroup[] = [
    {
        dateLabel: "7 Jul · Yesterday · Monday",
        tasks: [
            { id: 1, title: "nnnmmm", time: "21:10", project: "Inbox" },
            { id: 2, title: "cxxxxxxxxx", time: "21:10", project: "Inbox" },
            { id: 3, title: "asa", time: "16:45", project: "Inbox" },
            {
                id: 4,
                title: "Welcome to Todoist! 🎉",
                time: "15:19",
                project: "Set up your team",
            },
        ],
    },
];
export const CompletedList = () => {
    return (
        <div style={{ padding: 24 }}>
            {mockData.map((group, groupIndex) => (
                <div key={groupIndex}>
                    <Text strong>{group.dateLabel}</Text>
                    <div style={{ marginTop: 12 }}>
                        {group.tasks.map((task) => (
                            <div
                                key={task.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "12px 0",
                                    borderBottom: "1px solid #f0f0f0",
                                }}
                            >
                                {/* Avatar + Check icon */}
                                <div style={{ position: "relative" }}>
                                    <Avatar
                                        size={40}
                                        src={undefined}
                                        icon={undefined}
                                        style={{ backgroundColor: "#f0f0f0" }}
                                    />
                                    <CheckCircleFilled
                                        style={{
                                            color: "green",
                                            fontSize: 18,
                                            position: "absolute",
                                            bottom: 0,
                                            right: -4,
                                            background: "#fff",
                                            borderRadius: "50%",
                                        }}
                                    />
                                </div>

                                {/* Task content */}
                                <div style={{ flex: 1 }}>
                                    <Text>
                                        <strong>You</strong> completed a task:{" "}
                                        <Link>{task.title}</Link>
                                    </Text>
                                </div>

                                {/* Time + Project */}
                                <Space direction="vertical" align="end">
                                    <Text type="secondary">{task.time}</Text>
                                    <Text type="secondary">{task.project}</Text>
                                </Space>
                            </div>
                        ))}
                    </div>
                    <Divider />
                </div>
            ))}
            <Text type="secondary">That's it. No more history to load.</Text>
        </div>
    )
}
