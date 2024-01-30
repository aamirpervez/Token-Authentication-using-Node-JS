'use strict';
const createError = require('http-errors');
const { authSchema, isValidPassword } = require('../helper/validation_schema');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helper/jwt_helper');
const userData = require('../data/users');

const getRegistered = async (req, res, next) => {
    try {


        const result = await authSchema.validateAsync(req.body);

        //Check user already exist in DB.
        const doesExist = await userData.checkUserExist(result.email);
        if (doesExist) throw createError.Conflict(`${result.email} is already registered`)

        const insert = await userData.createUser(result);
        const accessToken = await signAccessToken(insert[0].userID);
        const refreshToken = await signRefreshToken(insert[0].userID);

        res.send({ accessToken, refreshToken });

    } catch (error) {

        if (error.isJoi === true) error.status = 422;
        next(error)
    }
}

const getLogin = async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body);
        //Check user already exist in DB.
        const user = await userData.findUserByEmail(result.email);
        if (!user) throw createError.NotFound("User not registered")

        //Match Password 
        const isMatch = await isValidPassword(result.password, user.password);
        if (!isMatch) throw createError.Unauthorized("Username or Password not valid.")

        const accessToken = await signAccessToken(user.userID);
        const refreshToken = await signRefreshToken(user.userID);

        res.send({ accessToken, refreshToken });
    } catch (error) {
        if (error.isJoi === true)
            return next(createError.BadRequest("Invalid Username or Password."))

        next(error)
    }
}

//If Access Token Get expires, we can use the refresh token to generate new access and refresh tokens to stay for long time on browser, until refresh actual timeout.
const getRefreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw createError.BadRequest();

        const userId = await verifyRefreshToken(refreshToken);

        const accessToken = await signAccessToken(userId);
        const refToken = await signRefreshToken(userId);

        res.send({ accessToken, refToken });

    } catch (error) {
        next(error)
    }
}

//From client side delete the access and refresh token and also from server side if save somewhere in DB.

const logout = async (req, res, next) => {
    try {
        res.send("logout route")
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getRegistered,
    getLogin,
    getRefreshToken,
    logout
}