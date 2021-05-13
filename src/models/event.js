const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    cost: {
        type: Number,
        min: 1
    },
    category: {
        type: String,
        enum: ['business', 'casual', 'party', 'general']
    }
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;