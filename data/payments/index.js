'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getPayments = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const paymentsList = await pool.request().query(sqlQueries.paymentsList);
        return paymentsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}


const getbyId = async (paymentID) => {
    try {

        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const onePayment = await pool.request()
            .input('paymentID', sql.Int, paymentID)
            .query(sqlQueries.paymentById);

        return onePayment.recordset;

    } catch (error) {
        console.log(error.message);
    }
}

const createPayment = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const insertPayment = await pool.request()
            .input('eventID', sql.Int, eventdata.eventID)
            .input('total', sql.Numeric(18, 2), eventdata.total)
            .input('paymentMethod', sql.NVarChar(100), eventdata.paymentMethod)
            .input('paymentDate', sql.Date, eventdata.paymentDate)
            .input('active', sql.Bit, eventdata.active)

            .query(sqlQueries.createPayment);

        return insertPayment.recordset;
    } catch (error) {
        return error.message;
    }
}

const updatePayment = async (paymentId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const update = await pool.request()
            .input('paymentID', sql.Int, paymentId)
            .input('eventID', sql.Int, data.eventID)
            .input('total', sql.Numeric(18, 2), data.total)
            .input('paymentMethod', sql.NVarChar(100), data.paymentMethod)
            .input('paymentDate', sql.Date, data.paymentDate)
            .input('active', sql.Bit, data.active)
            .query(sqlQueries.updatePayment);

        return update.recordset;

    } catch (error) {
        return error.message;
    }
}

const deletePayment = async (paymentID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const deleteEvent = await pool.request()
            .input('paymentID', sql.Int, paymentID)
            .query(sqlQueries.deletePayment);
        return deleteEvent.recordset;
    } catch (error) {
        return error.message;
    }
}



module.exports = {
    getPayments,
    getbyId,
    createPayment,
    updatePayment,
    deletePayment
}