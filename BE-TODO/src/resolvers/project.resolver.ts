import { Project } from "../model/project.model";
import { Task } from "../model/task.model";
import { getUserIdFromToken } from "../utils/auth";
import jwt from 'jsonwebtoken';
import { secretkey } from "..";
import { ProjectMember } from "../model/project-member.model";


export const resolversProject = {
    Query: {
        getListProject: async (_: any, args: any, context: any) => {
            try {
                const userId = getUserIdFromToken(context.req);

                // Lấy tất cả project mà user là member
                const memberProjects = await ProjectMember.find({
                    user_id: userId,
                    deleted: false,
                }).select('project_id');

                const memberProjectIds = memberProjects.map(p => p.project_id);

                // Truy vấn tất cả project mà user là chủ sở hữu hoặc là thành viên
                const projects = await Project.find({
                    deleted: false,
                    $or: [
                        { created_by: userId },
                        { _id: { $in: memberProjectIds } }
                    ]
                }).sort({ created_at: -1 });

                return projects;
            } catch (error: any) {
                throw new Error("Có lỗi khi lấy danh sách dự án: " + error.message);
            }
        },
        getProject: async (_: any, args: any, context: any) => {
            try {
                const { id } = args
                const project = await Project.findOne({
                    _id: id,
                    deleted: false,
                }).sort({ created_at: -1 });
                return project;
            } catch (error: any) {
                throw new Error("Có lỗi khi lấy dự án: " + error.message);
            }
        },
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
        },
        generateProjectInviteLink: async (_: any, args: any, context: any) => {
            const { projectId } = args;
            const userId = getUserIdFromToken(context.req);

            const project = await Project.findById(projectId);
            const isMember = await ProjectMember.findOne({
                project_id: projectId,
                user_id: userId,
                deleted: false,
            });
            if (!project || !isMember && project.created_by?.toString() !== userId)
                throw new Error('Không có quyền chia sẻ');

            const token = jwt.sign(
                { projectId },
                secretkey,
                { expiresIn: '7d' }
            );

            const inviteLink = `localhost:${process.env.FE_PORT}/projects/join/${token}`;
            return inviteLink;
        },
        joinProject: async (_: any, args: any, context: any) => {
            const { token } = args;
            const userId = getUserIdFromToken(context.req);
            const decoded = jwt.verify(token, secretkey) as { projectId: string };
            const { projectId } = decoded;

            const project = await Project.findById(projectId);
            if (!project) throw new Error('Không tìm thấy dự án');

            // Kiểm tra xem user đã là thành viên chưa
            const existingMember = await ProjectMember.findOne({
                project_id: projectId,
                user_id: userId,
                deleted: false,
            });

            if (!existingMember) {
                await ProjectMember.create({
                    project_id: projectId,
                    user_id: userId,
                    role: 'member',
                });
            }

            return project;
        }
    },
    Project: {
        tasks: async (parent: any, _: any, context: any) => {
            const tasks = await Task.find({
                project_id: parent.id,
                deleted: false,
            });
            return tasks;
        }
    }
}
