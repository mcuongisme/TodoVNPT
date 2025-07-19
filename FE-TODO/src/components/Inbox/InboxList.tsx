import {
    EditOutlined,
    TagOutlined,
    CommentOutlined,
    MoreOutlined,
    DragOutlined,
} from "@ant-design/icons"; import { Checkbox, Space, Spin, Tooltip, Typography } from 'antd';
import { LoadData } from "../Common/LoadData";
import { useGetTasks } from "../../hooks/useTasks";
const { Text } = Typography;

export const InboxList = () => {
    const { tasks, loading, error } = useGetTasks();

    if (loading || error) return <LoadData loading={loading} error={error} />;
    return (
        <div>
            {tasks.map((task: any) => (
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
                        <Text type="secondary">{task.note}</Text>

                        {task.due_date && (
                            <div style={{ marginTop: 4 }}>
                                <Text type="secondary" style={{ color: "#a81f00" }}>
                                    📅 {task.due_date}
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
