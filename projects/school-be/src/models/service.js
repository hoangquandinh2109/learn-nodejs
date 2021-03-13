import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prices: [{
        type: Number,
        required: true
    }]
});

export default mongoose.model('Service', serviceSchema);