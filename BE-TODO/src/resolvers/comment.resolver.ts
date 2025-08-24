import { Comment } from '../model/comment.model';
import { Task } from '../model/task.model';
import { User } from '../model/user.model';
import { getUserIdFromToken } from '../utils/auth';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from '../model/notification.model';
import { ProjectMember } from '../model/project-member.model';

// Định nghĩa channel cho subscription
const COMMENT_ADDED = 'COMMENT_ADDED';

export const resolversComment = {
    Query: {
        getListComment: async (_: any, args: any, context: any) => {
            const { taskId } = args;

            const comments = await Comment.find({
                task: taskId,
                deleted: false,
            })
                .populate('author', 'id firstName lastName email')
                .populate('parent')
                .sort({ created_at: 1 });

            return comments;
        },
    },
    Mutation: {
        createComment: async (_: any, { input }: any, context: any) => {
            try {
                const { pubsub } = context;
                const userId = getUserIdFromToken(context.req);

                // 1. Tạo comment
                const newComment = await Comment.create({
                    content: input.content,
                    task: input.taskId,
                    author: userId,
                    parent: input.parentId || null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    deleted: false,
                });

                const populatedComment = await Comment.findById(newComment._id)
                    .populate("author", "id firstName lastName email")
                    .populate("task")
                    .populate("parent");

                // 2. Publish sự kiện commentAdded cho task
                pubsub.publish(`${COMMENT_ADDED}_${input.taskId}`, {
                    commentAdded: populatedComment,
                });

                // 3. Lấy task để biết projectId
                const task = await Task.findById(input.taskId);
                if (!task) {
                    throw new Error("Task not found");
                }

                // 4. Lấy toàn bộ thành viên project (trừ người đang comment)
                const members = await ProjectMember.find({
                    project_id: task.project_id,
                    deleted: false,
                    user_id: { $ne: userId },
                });

                // 5. Gửi notification cho từng member
                for (const member of members) {
                    const notification = await Notification.create({
                        user_id: member.user_id,
                        task_id: task._id,
                        project_id: task.project_id,
                        message: `Có bình luận mới trong task "${task.title}"`,
                        is_read: false,
                        created_at: new Date(),
                    });

                    // Publish realtime cho user này
                    pubsub.publish(`NEW_NOTIFICATION_${member.user_id}`, {
                        newNotification: notification,
                    });
                }

                return populatedComment;
            } catch (err: any) {
                throw new Error("Tạo bình luận thất bại: " + err.message);
            }
        },
    },


    Subscription: {
        commentAdded: {
            subscribe: (_: any, { taskId }: { taskId: string }, { pubsub }: { pubsub: PubSub }) => {

                if (!taskId) {
                    throw new Error('taskId is required for commentAdded subscription');
                }
                return pubsub.asyncIterableIterator(`${COMMENT_ADDED}_${taskId}`);
            },
        },
    },
    Comment: {
        task: async (parent: any) => await Task.findById(parent.task),
        author: async (parent: any) => await User.findById(parent.author),
        parent: async (parent: any) => (parent.parent ? await Comment.findById(parent.parent) : null),
    },
};