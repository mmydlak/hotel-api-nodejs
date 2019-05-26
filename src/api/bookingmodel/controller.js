const bookingModel = require('./model').model;

const create = (req, res, next) => {
    bookingModel.create(req.body)
        .then(result => res.status(201).json({
            message: 'Booking created successfully',
            booking: result.getView()
        }))
        .catch(next)
}

const showAll = (req, res, next) => {
    bookingModel.find()
        .exec()
        .then(results => res.status(200).json({
            count: results.length,
            bookings: results.map((booking) => booking.getView())
        }))
        .catch(next)
}

const showOne = (req, res, next) => {
    bookingModel.findById(req.params.id)
        .exec()
        .then(result => {
            if(result) {
                res.status(200).json(result.getView())
            } else {
                res.status(404).json({
                    message: 'No booking found to provided id.'
                })
            }
        })
        .catch(next)
}

const destroy = (req, res, next) => {
    bookingModel.remove({_id: req.params.id})
        .exec()
        .then(result => {
            if(result.n > 0) {
                res.status(200).json({
                    message: 'Successfully deleted booking with id ' + req.params.id + ' in the number of: ' + result.n +'.'
                })
            } else {
                res.status(404).json({
                    message: 'No booking found to provided id.'
                })
            }
        })
        .catch(next)
}

const update = (req, res, next) => {
    bookingModel.findById(req.params.id)
        .exec()
        .then(booking => booking ? Object.assign(booking, req.body).save() : booking)
        .then(booking => { booking
            ? res.status(200).json({
                message: 'Booking successfully updated.',
                new_booking: booking.getView()
            })
            : res.status(404).json({
                message: 'No booking found to provided id.'
            })
        })
        .catch(next)
}

module.exports = {create, showAll, showOne, destroy, update}