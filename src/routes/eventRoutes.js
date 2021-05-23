const express = require('express');
const router = express.Router();
const evCtrl = require('../controllers/eventControllers');
const { authenticateUser, checkIfAdmin } = require('../middlewares/authentication');

// POST request to /events to create new event
router.post('/events', authenticateUser, evCtrl.createNewEvent);

// GET request to /events to fetch all events
router.get('/events', authenticateUser, evCtrl.fetchEvents);

// GET request to /events/:id to fetch a single event
router.get('/events/:id', authenticateUser, evCtrl.fetchSingleEvent);

// PUT request to /events/:id to update a single event
router.put('/events/:id', authenticateUser, checkIfAdmin, evCtrl.updateSingleEvent);

// DELETE request to /events/:id to delete a single event
router.delete('/events/:id', authenticateUser, checkIfAdmin, evCtrl.deleteSingleEvent);

module.exports = router;