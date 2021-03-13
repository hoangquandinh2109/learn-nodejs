import mongoose from 'mongoose';

const workSchema = new mongoose.Schema(
    {
        price: {
            type: Number,
            required: true
        },
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service"
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        }
    }
);

export default mongoose.model('Work', workSchema);