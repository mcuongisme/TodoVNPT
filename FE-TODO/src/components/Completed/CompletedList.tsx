import React from 'react'
import { Typography, Avatar, Space, Divider, Empty } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useGetTasksCompleted } from '../../hooks/useTasks';
import { LoadData } from '../Common/LoadData';
const { Text, Link } = Typography;


export const CompletedList = () => {
    const { tasks, loading, error } = useGetTasksCompleted();

    if (loading || error) return <LoadData loading={loading} error={error} />;
    if (!tasks || tasks.length === 0) {
        return <Empty description="Không có dữ liệu nào" />;
    }
    return (
        <div style={{ padding: 24 }}>
            <div>
                <div style={{ marginTop: 12 }}>
                    {tasks.map((task: any) => (
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
                            <div style={{ position: "relative" }}>
                                <Avatar
                                    size={40}
                                    icon={<span style={{ fontSize: 18 }}>👤</span>}
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

                            <div style={{ flex: 1 }}>
                                <Text>
                                    <strong>Bạn </strong> đã hoàn thành:{" "}
                                    <Link>{task.title}</Link>
                                </Text>
                            </div>

                            <Space direction="vertical" align="end">
                                <Text type="secondary">time</Text>
                                <Text type="secondary">project</Text>
                            </Space>
                        </div>
                    ))}
                </div>
                <Divider />
            </div>
            <Text type="secondary">Chưa có công việc nào được hoàn thành.</Text>
        </div>
    )
}
