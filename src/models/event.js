const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        min: [0.01, 'Cost must be greater than 0, currently you have {VALUE} as the cost']
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ['business', 'casual', 'party', 'general'],
            message: '{VALUE} is not supported as a category value'
        }
    },
    image: {
        type: String
    }
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;