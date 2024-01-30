'use strict';

const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

router.post('/auth/register', authenticationController.getRegistered);
router.post('/auth/login', authenticationController.getLogin);
router.post('/auth/refresh-token', authenticationController.getRefreshToken);
router.delete('/auth/logout', authenticationController.logout);

module.exports = {
    routes: router
}