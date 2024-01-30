'use strict';

const paymentData = require('../data/payments');

const getPayments = async (req, res, next) => {
    try {
        const payments = await paymentData.getPayments();
        res.send(payments);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPayment = async (req, res, next) => {
    try {
        const paymentID = req.params.id;
        const onePayment = await paymentData.getbyId(paymentID);
        res.send(onePayment);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addPayment = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await paymentData.createPayment(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatPayment = async (req, res, next) => {
    try {
        const paymentId = req.params.id;
        const data = req.body;
        const updated = await paymentData.updatePayment(paymentId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePayment = async (req, res, next) => {
    try {
        const paymentID = req.params.id;
        const deletePayment = await paymentData.deletePayment(paymentID);
        res.send(deletePayment);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getPayments,
    getPayment,
    addPayment,
    updatPayment,
    deletePayment
}