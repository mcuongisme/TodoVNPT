import { Schema, model, Types } from 'mongoose';

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    task: {
        type: String,
        ref: 'Task',
        required: true
    },
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    parent: {
        type: Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project',
        default: null
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date,
        default: null
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export const Comment = model('Comment', CommentSchema);
