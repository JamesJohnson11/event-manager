const Event = require('../models/event');


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

exports.fetchSingleEvent = function (req, res) {
    let id = req.params.id;
    Event.findById(id, (err, event) => {
        if (err) {
            return res.status(500).json({message: err});
        } else if (!event) {
            return res.status(404).json({message: "Event not found"});
        } else {
            return res.status(200).json({event});
        }
    })
}