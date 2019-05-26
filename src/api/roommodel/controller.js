const roomModel = require('./model').model;
const getFilters = require('./helpers');

const create = (req, res, next) => {
    // const room = new roomModel({
    //     _id: new mongoose.Types.ObjectId(),
    //     room_number: req.body.room_number,
    //     price_per_night: req.body.price_per_night,
    //     persons: req.body.persons,
    //     beds: req.body.beds
    // })
    //
    // room.save().then(result => {
    //     console.log(result);
    //     res.status(201).json({message: 'ok jest', created: room});
    // }).catch(next)
    roomModel.create(req.body)
        .then(result => res.status(201).json({
            message: 'Room created successfully',
            room: result.getView(true)
        }))
        .catch(next)
}

const searching = (req, res, next) => {
    const sortBy = {};
    sortBy[req.query.sort_by || 'room_number'] = req.query.order_by || 'desc';
    roomModel.find(req.filters)
        .sort(sortBy)
        .exec()
        .then(results => res.status(200).json({
            count: results.length,
            rooms: results.map((room) => room.getView(true))
        }))
        .catch(next)
}


const showAll =  (req, res, next) => {
    roomModel.find()
    //.select("_id room_number price_per_night persons beds")
        .exec()
        .then(results => res.status(200).json({
            count: results.length,
            rooms: results.map((room) => room.getView(true))
        }))
        .catch(next)
}

const showOne = (req, res, next) => {
    roomModel.findById(req.params.id)
        .exec()
        .then(result => {
            if(result) {
                res.status(200).json(result.getView(true))
            } else {
                res.status(404).json({
                    message: 'No room found to provided id.'
                })
            }
        })
        .catch(next)
}

const destroy = (req, res, next) => {
    roomModel.remove({_id: req.params.id})
        .exec()
        .then(result => {
            if(result.n > 0) {
                res.status(200).json({
                    message: 'Successfully deleted room with id ' + req.params.id + ' in the number of: ' + result.n +'.'
                })
            } else {
                res.status(404).json({
                    message: 'No room found to provided id.'
                })
            }
        })
        .catch(next)
}

// dwa then bo gdyby save() sie nie powiodło przez np próbe zmiany id to wtedy nie catchuje wyjątku
const update = (req, res, next) => {
    roomModel.findById(req.params.id)
        .exec()
        .then(room => room ? Object.assign(room, req.body).save() : room)
        .then(room => { room
            ? res.status(200).json({
                message: 'Room successfully updated.',
                new_room: room.getView(true)
            })
            : res.status(404).json({
                message: 'No room found to provided id.'
            })
        })
        .catch(next)
}


module.exports = {create, searching, showAll, showOne, destroy, update}