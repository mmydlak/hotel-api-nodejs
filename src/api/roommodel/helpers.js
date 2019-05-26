const roomModel = require('./model').model;
const qs = require('qs');
const _ = require('lodash');

const getFilters = (req,res,next) => {
    const availableFilters = Object.keys(roomModel.schema.paths);
    const filters = qs.parse(req.query);

    const schemaFilters = _.pickBy(filters, (value, key) => availableFilters.indexOf(key) > -1);
    let searchFilter = {};
    if (filters.q) {
        searchFilter = {
            $text: {
                $search: filters.q
            }
        }
    }

    req.filters = { ...searchFilter, ...schemaFilters };
    next();
    // const availableFilters = Object.keys(roomModel.schema.paths);
    // const filters = qs.parse(req.query);
    // req.filters = _.pickBy(filters, (value, key) => availableFilters.indexOf(key) > -1);
    // next();
}

module.exports = getFilters