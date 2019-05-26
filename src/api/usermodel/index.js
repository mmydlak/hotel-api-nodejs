const { Router } = require('express');
const { token, password } = require('../../services/passport')
const {create, auth, showAll, showOne, destroy, update} = require('./controller')
const router = new Router();

router.post('/signup',
    create);

router.post('/login',
    password(),
    auth);

router.get('/',
    token({ required: true, roles: ['admin'] }),
    showAll);

router.get('/:id',
    token({ required: true, roles: ['admin'] }),
    showOne);

// router.get('/me', ({ user }, res) =>
//         res.json(user.view())
// )

router.delete('/:id',
    token({ required: true, roles: ['admin'] }),
    destroy);

router.put('/',
    token({ required: true}),
    update);


module.exports = router