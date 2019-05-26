//Alternatywnie:
//const express = require('express');
//const router = express.Router();
const roomModel = require('./roommodel');
const userModel = require('./usermodel');
const bookingModel = require('./bookingmodel');
const { Router } = require('express');

const router = new Router();

router.use('/users', userModel)
router.use('/rooms', roomModel)
router.use('/bookings', bookingModel)

module.exports = router
