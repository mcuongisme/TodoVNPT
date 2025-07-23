import {
    EditOutlined,
    TagOutlined,
    CommentOutlined,
    MoreOutlined,
    DragOutlined,
    LoadingOutlined,
} from "@ant-design/icons"; import { Checkbox, Empty, Flex, Space, Spin, Tooltip, Typography } from 'antd';
import { useQuery } from "@apollo/client";
import { GET_LIST_TASK } from "../../graphql/queries/taskQueries";
import { LoadData } from "../Common/LoadData";
const { Text } = Typography;

export const TodayList = () => {
    const { loading, error, data } = useQuery(GET_LIST_TASK, {
        variables: {
            sortKey: "createdAt",
            sortValue: "desc",
            currentPage: 1,
            limitItem: 10,
        },
    });

    if (loading || error) return <LoadData loading={loading} error={error} />;
    if (!data || !data.getListTask || data.getListTask.length === 0) {
        return <Empty description="Không có công việc nào trong ngày hôm nay" />;
    }
    return (
        <div>
            {data.getListTask.map((task: any) => (
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
