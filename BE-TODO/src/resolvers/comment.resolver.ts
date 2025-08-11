import { Comment } from '../model/comment.model';
import { Task } from '../model/task.model';
import { User } from '../model/user.model';
import { getUserIdFromToken } from '../utils/auth';
import { PubSub } from 'graphql-subscriptions';

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
                const { pubsub } = context; // Lấy PubSub từ context
                const userId = getUserIdFromToken(context.req);

                const newComment = await Comment.create({
                    content: input.content,
                    task: input.taskId,
                    author: userId,
                    parent: input.parentId || null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    deleted: false,
                });

                // Populate dữ liệu để trả về và gửi qua subscription
                const populatedComment = await Comment.findById(newComment._id)
                    .populate('author', 'id firstName lastName email')
                    .populate('task')
                    .populate('parent');

                // Phát sự kiện subscription cho taskId cụ thể
                pubsub.publish(`${COMMENT_ADDED}_${input.taskId}`, { commentAdded: populatedComment });

                return populatedComment;
            } catch (err: any) {
                throw new Error('Tạo bình luận thất bại: ' + err.message);
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