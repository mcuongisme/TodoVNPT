import { Schema, model, Types } from 'mongoose';

const ProjectMemberSchema = new Schema({
    project_id: {
        type: String,
        ref: 'Project', required: true
    },
    user_id: {
        type: String,
        ref: 'User', required: true
    },
    role: {
        type: String,
        required: true
    },
    joined_at: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date,
        default: null
    },
});

export const ProjectMember = model('ProjectMember', ProjectMemberSchema, 'project_members');