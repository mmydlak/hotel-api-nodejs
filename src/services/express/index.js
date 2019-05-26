const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const api = require('../../api');
const { urlRoot } = require('../../config');
const _ = require('lodash')


const app = express();

//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())                          //obsluga dekodowania json
//app.use(bodyParser.urlencoded({extended: true}))
app.use(urlRoot, api)                               //punkt wejsciowy API (poczatek adresu URL) oraz ustawienie routes (gdzie oblugiwany jest routing)

//error handling
app.use((req,res,next) => {
    const error = new Error('Routing not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next) => {
    console.error('Default error handler:');
    console.error(error);
    if(error.name === 'ValidationError'){
        const errors = _.map(error.errors, (v) => v.message )
        return res.status(400).send({errors})
    }
    if(error.name === 'CastError') {
        error.status = 400;
    }
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app
