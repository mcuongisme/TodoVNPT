import { Schema, model, Types } from 'mongoose';

const NotificationSchema = new Schema({
    user_id: {
        type: String,
        ref: 'User', required: true
    },
    task_id: {
        type: String,
        ref: 'Task', default: null
    },
    project_id: {
        type: String,
        ref: 'Project', default: null
    },
    message: {
        type: String,
        required: true
    },
    is_read: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    }, // Xóa mềm
    deleted_at: {
        type: Date,
        default: null
    }, // Thời điểm xóa mềm
});

export const Notification = model('Notification', NotificationSchema);