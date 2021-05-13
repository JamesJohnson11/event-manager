const { findOneAndUpdate } = require('../models/event');
const Event = require('../models/event');


// Create new event
exports.createNewEvent = function (req, res) {
    Event.create({
        ...req.body
    }, (err, newEvent) => {
        if (err) {
            return res.status(500).json({message: err});
        } else {
            return res.status(200).json({message: 'New event created!', newEvent});
        }
    })
}


// Fetch all events
exports.fetchEvents = function (req, res) {
    let conditions = {};
    if (req.query.category) {
        conditions.category = req.query.category;
    }
    Event.find(req.query, (err, events) => {
        if (err) {
            return res.status(500).json({message: err});
        } else {
            return res.status(200).json({events});
        }
    })
}


// Fetch single event
exports.fetchSingleEvent = function (req, res) {
    let id = req.params.id;
    Event.findById(id, (err, event) => {
        if (err) {
            return res.status(500).json({message: err});
        } else if (!event) {
            return res.status(404).json({message: 'Event not found'});
        } else {
            return res.status(200).json({event});
        }
    })
}


// Update single event
exports.updateSingleEvent = function (req, res) {
    Event.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, event) => {
        if (err) {
            return res.status(500).json({message: err});
        } else if (!event) {
            return res.status(404).json({message: 'Event not found'});
        } else {
            return res.status(200).json({message: 'Event successfully updated!', event});
        }
    })
}


// Delete single event
exports.deleteSingleEvent = function (req, res) {
    Event.findByIdAndDelete(req.params.id, (err, event) => {
        if (err) {
            return res.status(500).json({message: err});
        } else if (!event) {
            return res.status(404).json({message: 'Event not found'});
        } else {
            return res.status(200).json({message: 'Event successfully deleted!', event});
        }
    })
}