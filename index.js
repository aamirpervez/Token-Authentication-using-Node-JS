'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authenticationRoutes = require('./routes/authenticationRoutes');

const createError = require('http-errors');
const morgan = require('morgan');

// const client = require('./helper/init_redis');
// client.SET("Foo", "bar");

const app = express();


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//Since its only a logger so we can also use  "dev" in production to log our requests.
app.use(morgan('dev'))

app.use('/api', eventRoutes.routes);
app.use('/api', paymentRoutes.routes);
app.use('/api', authenticationRoutes.routes);

app.use(async (req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(config.port, () => {
    console.log('app listening on url http://localhost:' + config.port)
});