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
        type: Date,
        default: Date.now
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
    completed_at: {
        type: Date,
        default: null
    },
});

export const Task = model('Task', TaskSchema);

function dayjs() {
    throw new Error('Function not implemented.');
}
