'use strict';

const express = require('express');
const eventControll = require('../controllers/eventController');
const router = express.Router();

router.get('/events', eventControll.getEvents);
router.get('/event/:id', eventControll.getEvent);
router.post('/event', eventControll.addEvent);
router.put('/event/:id', eventControll.updatEvent);
router.delete('/event/:id', eventControll.deleteEvent);

module.exports = {
    routes: router
}