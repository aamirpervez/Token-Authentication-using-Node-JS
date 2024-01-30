const JWT = require('jsonwebtoken');
const createError = require('http-errors');


module.exports = {
    signAccessToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {
            }

            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '20sec',
                issuer: 'aamirpage.com',
                audience: userID.toString(),
            };

            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(createError.InternalServerError())
                }
                resolve(token)
            });
        })
    },
    verifyAccessToken: (req, res, next) => {

        if (req.headers.authorization) {
            const authHeader = req.headers['authorization'];
            const bearerToken = authHeader.split(' ');
            const token = bearerToken[1];

            JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (err) {

                    const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                    return next(createError.Unauthorized(message));
                }

                req.payload = payload;

                next()
            })
        }
        else {
            return next(createError.Unauthorized());
        }

    },
    signRefreshToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {}

            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: '1y',
                issuer: 'aamirpage.com',
                audience: userID.toString(),
            };

            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(createError.InternalServerError())
                }

                resolve(token)
            });
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) return reject(createError.Unauthorized())

                const userId = payload.aud;

                resolve(userId)
            })
        })
    },
    authUserRole: (role) => {
        return (req, res, next) => {
            if (req.headers.role !== role) {
                res.status(401)
                return res.send('Not Allowed')
            }

            next()
        }
    }
}