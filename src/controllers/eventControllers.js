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