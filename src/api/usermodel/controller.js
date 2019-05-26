const userModel = require('./model').model;
const { sign } = require('../../services/jwt')
const bcrypt = require('bcrypt')

const create = (req, res, next) => {
    userModel.create(req.body)
        .then(result => {
            sign(result)
                .then(token => res.status(201).json({
                    message: 'User created successfully.',
                    token: token,
                    user: result.getView()
                }))
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).json( {
                    error: {
                        message: 'Email already registered.'
                    }
                })
            } else {
                next(err)
            }
        })
}

const auth = (req, res, next) => {
    const {user} = req
    sign(user)
        .then((token) => res.status(201).json({
            message: 'Login was successful.',
            token: token,
            user: user.getView()
        }))
        .catch(next)
}

    // userModel.findOne({email: req.body.email})
    //     .exec()
    //     .then(user => {
    //         if (user) {
    //             bcrypt.compare(req.body.password, user.password, (error, result) => {
    //                 if(!error) {
    //                     if(result){
    //                         sign(user, { expiresIn: '1h'})
    //                             .then((token) => ({ token, user: user.view(true) }))
    //                             .then( res.status(200).json({
    //                                 message: 'Auth successful.'
    //                             }))
    //                     }
    //                 }
    //                 return res.status(401).json({
    //                     error: {
    //                         message: 'Auth failed.',
    //                     }
    //                 })
    //             });
    //         } else {
    //             res.status(401).json({
    //                 error:{
    //                     message: 'Auth failed.',
    //                 }
    //             })
    //         }
//         })
//         .catch(next)
// }

const showAll = (req, res, next) => {
    userModel.find()
        .exec()
        .then(results => res.status(200).json({
            count: results.length,
            users: results.map((user) => user.getView())
        }))
        .catch(next)
}

const showOne = (req, res, next) => {
    userModel.findById(req.params.id)
        .exec()
        .then(result => {
            if(result) {
                res.status(200).json(result.getView())
            } else {
                res.status(404).json({
                    message: 'No user found to provided id.'
                })
            }
        })
        .catch(next)
}

// router.get('/me', ({ user }, res) =>
//         res.json(user.view())
// )

const destroy = (req, res, next) => {
    userModel.remove({_id: req.params.id})
        .exec()
        .then(result => {
            if(result.n > 0) {
                res.status(200).json({
                    message: 'Successfully deleted user with id ' + req.params.id + ' in the number of: ' + result.n +'.'
                })
            } else {
                res.status(404).json({
                    message: 'No user found to provided id.'
                })
            }
        })
        .catch(next)
}

const update = (req, res, next) => {
    userModel.findById(req.user.id)
        .exec()
        .then(user => user ? Object.assign(user, req.body).save() : user)
        .then(user => { user
            ? res.status(200).json({
                message: 'User successfully updated.',
                new_user: user.getView()
            })
            : res.status(404).json({
                message: 'No user found to provided id.'
            })
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).json( {
                    error: {
                        message: 'Email already registered.'
                    }
                })
            } else {
                next(err)
            }
        })
}

module.exports = {create, auth, showAll, showOne, destroy, update}