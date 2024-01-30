'use strict';

const express = require('express');
const paymentControll = require('../controllers/paymentController');
const router = express.Router();
const { verifyAccessToken, authUserRole } = require('../helper/jwt_helper');

router.get('/payments', verifyAccessToken, authUserRole, paymentControll.getPayments);
router.get('/payment/:id', paymentControll.getPayment);
router.post('/payment', paymentControll.addPayment);
router.put('/payment/:id', paymentControll.updatPayment);
router.delete('/payment/:id', paymentControll.deletePayment);

module.exports = {
    routes: router
}