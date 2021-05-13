const express = require('express');
const router = express.Router();
const evCtrl = require('../controllers/eventControllers');

// POST request to /events to create new event
router.post('/events', evCtrl.createNewEvent);

// GET request to /events to fetch all events
router.get('/events', evCtrl.fetchEvents);

// GET request to /events/:id to fetch a single event
router.get('/events/:id', evCtrl.fetchSingleEvent);

module.exports = router;