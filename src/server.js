const http = require('http');
const app = require('./services/express');
const mongoose = require('./services/mongoose');
const { env, port, ip, mongo } = require('./config');

mongoose.connect(mongo.uri);

const server = http.createServer(app)

setImmediate(() => {
server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
})
})


module.exports = server