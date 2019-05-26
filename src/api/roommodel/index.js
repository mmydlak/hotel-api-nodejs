const { Router } = require('express');
const getFilters = require('./helpers');
const {create, searching, showAll, showOne, destroy, update} = require('./controller')

const router = new Router();

router.post('/', create);

router.get('/search', getFilters, searching)

router.get('/', showAll)

router.get('/:id', showOne)

router.delete('/:id', destroy)

// dwa then bo gdyby save() sie nie powiodło przez np próbe zmiany id to wtedy nie catchuje wyjątku
router.put('/:id', update)

module.exports = router