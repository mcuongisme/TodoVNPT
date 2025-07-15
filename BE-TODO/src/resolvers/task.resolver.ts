import { Task } from "../model/task.model"

export const resolversTask = {
    Query: {
        getListTask: async (_: any, args: any) => {

            const { sortKey, sortValue, currentPage, limitItem } = args;

            const sort: any = {}
            if (sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }

            const skip = (currentPage - 1) * limitItem
            const tasks = await Task.find({
                deleted: false
            }).sort(sort).limit(limitItem).skip(skip)
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
        createTask: async (_: any, args: any) => {
            const { task } = args;

            const record = new Task(task)
            await record.save();

            return record;
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

            return "Thay đổi thành thụ";
        }
    }
}