import { TaskLabel } from "../model/task-label.model";
import { Task } from "../model/task.model"
import { getUserIdFromToken } from "../utils/auth";
export const resolversTask = {
    Query: {
        getListTask: async (_: any, args: any, context: any) => {
            const userId = getUserIdFromToken(context.req);
            const { sortKey, sortValue, currentPage, limitItem, dateFilter } = args;

            const sort: any = {};
            if (sortKey && sortValue) sort[sortKey] = sortValue;
            const skip = (currentPage - 1) * limitItem;
            const startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0);

            const endOfToday = new Date();
            endOfToday.setHours(23, 59, 59, 999);

            const filter: any = {
                created_by: userId,
                completed: false,
                deleted: false
            };

            if (dateFilter === "overdue") {
                filter.due_date = { $lt: startOfToday };
            } else if (dateFilter === "today") {
                filter.due_date = { $gte: startOfToday, $lte: endOfToday };
            } else if (dateFilter === "future") {
                filter.due_date = { $gt: endOfToday };
            }

            const tasks = await Task.find(filter)
                .sort(sort)
                .limit(limitItem)
                .skip(skip);

            return tasks;
        },
        getListTaskCompleted: async (_: any, args: any, context: any) => {
            const userId = getUserIdFromToken(context.req);
            const { sortKey, sortValue, currentPage, limitItem } = args;

            const sort: any = {};
            if (sortKey && sortValue) sort[sortKey] = sortValue;

            const skip = (currentPage - 1) * limitItem;

            const tasks = await Task.find({
                created_by: userId,
                completed: true,
                deleted: false
            }).sort(sort).limit(limitItem).skip(skip);

            return tasks;
        },
        getTask: async (_: any, args: any) => {
            const { id } = args
            const task = await Task.findOne({
                _id: id,
                deleted: false
            })
            return task
        }
    },
    Mutation: {
        createTask: async (_: any, args: any, context: any) => {
            const { task } = args;
            try {
                const userId = getUserIdFromToken(context.req);
                const due_date = task.due_date ? new Date(task.due_date) : undefined;

                // 1. Tạo Task
                const record = new Task({
                    title: task.title,
                    note: task.note,
                    priority: task.priority,
                    due_date: due_date,
                    project_id: task.project_id,
                    created_by: userId
                });
                await record.save();
                if (task.labelIds && task.labelIds.length > 0) {
                    const taskLabels = task.labelIds.map((labelId: string) => ({
                        task_id: record._id.toString(),
                        label_id: labelId
                    }));

                    await TaskLabel.insertMany(taskLabels);
                }

                return record;
            } catch (error) {
                console.error(error);
                throw new Error("Invalid token");
            }
        },

        deleteTask: async (_: any, args: any) => {
            const { id } = args;

            await Task.updateOne({
                _id: id
            }, {
                deleted: true,
                deleted_at: Date.now()
            })

            return "Đã xóa";
        },

        updateTask: async (_: any, args: any) => {
            const { id, task } = args;

            await Task.updateOne({
                _id: id
            }, task)

            return "Thay đổi thành công";
        },
        updateTaskCompleted: async (_: any, args: any) => {
            const { id, completed } = args;
            const task = await Task.findById(id);
            if (!task) throw new Error("Task not found");

            task.completed = completed;
            await task.save();

            return task;
        }
    }
}
