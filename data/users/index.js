'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const bcrypt = require('bcrypt');

const checkUserExist = async (email) => {
    try {

        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const userExist = await pool.request()
            .input('email', sql.NVarChar(100), email)
            .query(sqlQueries.checkUserExistByEmail);

        return userExist.recordset[0].IsUserExist;

    } catch (error) {
        console.log(error.message);
    }
}

const createUser = async (data) => {
    try {

        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');

        //Hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        let userPassword = hashedPassword;

        const insertUser = await pool.request()
            .input('username', sql.NVarChar(100), data.username)
            .input('email', sql.NVarChar(100), data.email)
            .input('password', sql.NVarChar(100), userPassword)

            .query(sqlQueries.createUser);

        return insertUser.recordset;

    } catch (error) {
        console.log(error.message);
    }
}

const findUserByEmail = async (email) => {
    try {

        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const userExist = await pool.request()
            .input('email', sql.NVarChar(100), email)
            .query(sqlQueries.FindUserByEmail);

        return userExist.recordset[0];

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    checkUserExist,
    createUser,
    findUserByEmail
}