const { Router } = require('express');
const {create, showAll, showOne, destroy, update} = require('./controller')

const router = new Router();

router.post('/', create);

router.get('/', showAll)

router.get('/:id', showOne)

router.delete('/:id', destroy)

router.put('/:id', update)

module.exports = router