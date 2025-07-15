import { Schema, model, Types } from 'mongoose';

const LabelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        ref: 'User', required: true
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

export const Label = model('Label', LabelSchema);