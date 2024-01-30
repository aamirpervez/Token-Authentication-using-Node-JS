const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');


const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(3).required()
})

const isValidPassword = async function (password, userPassword) {
    try {
        return await bcrypt.compare(password, userPassword);
    } catch (error) {
        throw error
    }
}

module.exports = { authSchema, isValidPassword }