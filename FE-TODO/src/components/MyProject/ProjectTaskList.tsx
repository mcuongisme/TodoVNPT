import { Empty, Typography } from "antd";
import { LoadData } from "../Common/LoadData";
import { TaskItem } from "../Today/TaskItem";
import { useGetProject } from "../../hooks/useProject";
import { useParams } from "react-router-dom";
import { FileDoneOutlined } from "@ant-design/icons";
import { ButtonService } from "./ButtonService";
const { Title } = Typography

export const ProjectTaskList = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, error, data } = useGetProject(id!);
    if (loading || error) return <LoadData loading={loading} error={error} />;

    const handleSave = (id: string, updatedData: any) => {
        console.log("Lưu lại task:", id, updatedData);
    };

    return (

        <div>
            <ButtonService projectId={data.id} />
            <Title level={3}>Tên dự án: {data.name}</Title>

            <span style={{ color: '#999' }}>
                <FileDoneOutlined /> {data.tasks?.length || 0} công việc
            </span>

            {(!data.tasks || data.tasks.length === 0) ? (
                <Empty description="Không có công việc nào" />
            ) : (
                data.tasks.map((task: any) => (
                    <TaskItem key={task.id} task={task} onSave={handleSave} />
                ))
            )}
        </div>

    );
};
