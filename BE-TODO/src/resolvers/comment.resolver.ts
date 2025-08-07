import { Comment } from '../model/comment.model';
import { Task } from '../model/task.model';
import { User } from '../model/user.model';
import { getUserIdFromToken } from '../utils/auth';  // hàm lấy userId từ token

export const resolversComment = {
    Query: {
        getListComment: async (_: any, args: any, context: any) => {
            const { taskId } = args;

            const comments = await Comment.find({
                task: taskId,
                deleted: false,
            })
                .populate('author', 'id name')
                .populate('parent')
                .sort({ created_at: 1 });

            return comments;
        }
    },
    Mutation: {
        createComment: async (_: any, { input }: any, context: any) => {
            try {
                const userId = getUserIdFromToken(context.req);

                const newComment = await Comment.create({
                    content: input.content,
                    task: input.taskId,
                    author: userId,
                    parent: input.parentId || null,
                });

                return newComment;
            } catch (err: any) {
                throw new Error('Tạo bình luận thất bại: ' + err.message);
            }
        },
    },

    Comment: {
        task: async (parent: any) => await Task.findById(parent.task),
        author: async (parent: any) => await User.findById(parent.author),
        parent: async (parent: any) => parent.parent ? await Comment.findById(parent.parent) : null
    }
};
