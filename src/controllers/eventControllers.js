const { findOneAndUpdate } = require('../models/event');
const Event = require('../models/event');
const axios = require('axios');
const { response } = require('express');


// Create new event
exports.createNewEvent = function (req, res) {
    let query = req.body.category;
    let api = 'https://imagegen.herokuapp.com/?category=';
    let callUrl = api + query;
    axios.get(callUrl)
  .then(response => {
      req.body.image = response.data.image;
      Event.create({
          title: req.body.title,
          cost: req.body.cost,
          category: req.body.category,
          image: req.body.image
      }, (err, newEvent) => {
          if (err) {
              return res.status(500).json({message: err});
          } else {
              return res.status(200).json({message: 'New event created!', newEvent});
          }
      })
  })
   .catch(error => {
       console.log(error);
   });
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
    Event.findById(req.params.id, (err, event) => {
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
            event.save((err, savedEvent) => {
                if (err) {
                    return res.status(400).json({message: err});
                } else {
                    return res.status(200).json({message: 'Event successfully updated!', event});
                }
            });
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