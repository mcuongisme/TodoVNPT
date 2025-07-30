import { Empty } from "antd";
import { useGetTasks } from "../../hooks/useTasks";
import { LoadData } from "../Common/LoadData";
import { TaskItem } from "./TaskItem";

export const TodayList = () => {
    const { loading, error, tasks } = useGetTasks();

    if (loading || error) return <LoadData loading={loading} error={error} />;
    if (!tasks || tasks.length === 0) return <Empty description="Không có công việc nào" />;

    const handleSave = (id: string, updatedData: any) => {
        console.log("Lưu lại task:", id, updatedData);
        // TODO: Gọi mutation updateTask ở đây
    };

    return (
        <div>
            {tasks.map((task: any) => (
                <TaskItem key={task.id} task={task} onSave={handleSave} />
            ))}
        </div>
    );
};
