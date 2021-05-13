const express = require('express');
const router = express.Router();
const evCtrl = require('../controllers/eventControllers');

// POST request to /events to create new event
router.post('/events', evCtrl.createNewEvent)



module.exports = router;