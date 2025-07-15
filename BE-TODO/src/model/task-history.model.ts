import { Schema, model, Types } from 'mongoose';

const TaskHistorySchema = new Schema({
    task_id: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true
    }, // Hành động: 'Created', 'Updated', 'Completed', 'Assigned'
    details: { type: String },
    timestamp: {
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

export const TaskHistory = model('TaskHistory', TaskHistorySchema, 'task_history');