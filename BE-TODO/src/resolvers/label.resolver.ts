import { Label } from "../model/label.model";
import { getUserIdFromToken } from "../utils/auth";
import { TaskLabel } from "../model/task-label.model";
import { Task } from "../model/task.model";

export const resolversLabel = {
    Query: {
        getListLabel: async (_: any, args: any, context: any) => {
            const userId = getUserIdFromToken(context.req);
            const labels = await Label.find({
                deleted: false,
                created_by: userId
            }).sort({ created_at: -1 });
            return labels;
        },
        getListTaskLabel: async (_: any, { labelId }: { labelId: string }) => {
            const taskLabels = await TaskLabel.find({
                label_id: labelId,
                deleted: false,
            });

            const taskIds = taskLabels.map((tl: any) => tl.task_id);

            const tasks = await Task.find({
                _id: { $in: taskIds },
                deleted: false, // nếu bạn có field này
            });

            return tasks;
        },
        labelName: async (_: any, { labelId }: any) => {
            const label = await Label.findById(labelId);
            return label?.name || null;
        }
    },


    Mutation: {
        createLabel: async (_: any, args: any, context: any) => {
            try {
                const userId = getUserIdFromToken(context.req);
                const { label } = args;
                const newLabel = new Label({
                    ...label,
                    created_by: userId
                });
                await newLabel.save();
                return newLabel;
            } catch (error) {
                throw new Error("Invalid token");
            }

        },
        updateLabel: async (_: any, args: any) => {
            const { id, label } = args;
            const updatedLabel = await Label.findByIdAndUpdate(id, label, { new: true });
            return updatedLabel;
        },
        deleteLabel: async (_: any, args: any) => {
            const { id } = args;
            await Label.findByIdAndDelete(id);
            return true;
        },
        addTaskToLabel: async (_: any, { labelId, taskId }: { labelId: string, taskId: string }) => {
            const newTaskLabel = new TaskLabel({
                label_id: labelId,
                task_id: taskId,
                deleted: false
            });
            await newTaskLabel.save();
            return newTaskLabel;
        },
        removeTaskFromLabel: async (_: any, { labelId, taskId }: { labelId: string, taskId: string }) => {
            const result = await TaskLabel.findOneAndUpdate(
                { label_id: labelId, task_id: taskId, deleted: false },
                { deleted: true },
                { new: true }
            );
            return !!result; // trả về true nếu tìm thấy và cập nhật thành công
        }
    }

}