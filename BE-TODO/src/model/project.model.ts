import { Schema, model, Types } from 'mongoose';

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: { type: String },
    parent_project_id: {
        type: String,
        ref: 'Project',
        default: null
    },
    created_by: {
        type: String,
        ref: 'User',
        required: true
    },
    is_expanded: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
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

export const Project = model('Project', ProjectSchema);