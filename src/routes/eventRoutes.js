const express = require('express');
const router = express.Router();
const evCtrl = require('../controllers');

// POST request to /events to create new event
router.post('/events', evCtrl.createNewEvent)