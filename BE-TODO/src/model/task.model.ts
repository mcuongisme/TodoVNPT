import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
    project_id: {
        type: String,
        default: null
    },
    title: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    priority: {
        type: String
    },
    due_date: {
        type: String,
    },
    custom_due_date: {
        type: Date,
        default: null
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_by: {
        type: String,
    },
    assigned_to: {
        type: String,
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
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

export const Task = model('Task', TaskSchema);