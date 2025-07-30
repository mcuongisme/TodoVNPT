import { Project } from "../model/project.model";
import { getUserIdFromToken } from "../utils/auth";

export const resolversProject = {
    Query: {
        getListProject: async (_: any, args: any, context: any) => {
            try {
                const userId = getUserIdFromToken(context.req);
                const projects = await Project.find({
                    deleted: false,
                    created_by: userId
                }).sort({ created_at: -1 });

                return projects;
            } catch (error: any) {
                throw new Error("Có lỗi khi lấy danh sách dự án: " + error.message);
            }
        }
    },
    Mutation: {
        createProject: async (_: any, args: any, context: any) => {
            const { project } = args;
            const userId = getUserIdFromToken(context.req);
            try {
                const record = new Project({
                    ...project,
                    created_by: userId
                });
                await record.save();
                return record;
            } catch (error: any) {
                throw new Error("Có lỗi khi tạo dự án: " + error.message);
            }
        }
    }
}
