import { Project } from "../model/project.model";
import { getUserIdFromToken } from "../utils/auth";

export const resolversProject = {
    Query: {
        getListProject: async (_: any, args: any, context: any) => {
            const userId = getUserIdFromToken(context.req);
            const projects = await Project.find({
                deleted: false,
                created_by: userId
            }).sort({ created_at: -1 });
            return projects;
        },
    },
}