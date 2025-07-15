import { Schema, model, Types } from 'mongoose';

const TaskLabelSchema = new Schema({
    task_id: {
        type: String,
        ref: 'Task',
        required: true
    },
    label_id: {
        type: String,
        ref: 'Label',
        required: true
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

export const TaskLabel = model('TaskLabel', TaskLabelSchema, "task_labels");