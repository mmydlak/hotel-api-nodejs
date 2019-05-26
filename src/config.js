// Konfiguracja aplikacji
const path = require('path')
const merge = require('lodash/merge')

const config = {
    all: {
        env: process.env.NODE_ENV || 'development',
        root: path.join(__dirname, '..'),
        port: 9000,
        ip: '127.0.0.1',
        urlRoot: '/api',
        mongo: {
            options : {
                useCreateIndex: true,           // DeprecationWarning: collection.ensureIndex is deprecated.
                useNewUrlParser: true           // DeprecationWarning: current URL string parser is deprecated
            }
        },

    },
    test: {
        mongo: {
            uri: 'mongodb://localhost/ie-hotel-test',
            options: {
                debug: true
            }
        },
        jwtSecret: ''
    },
    development: {
        mongo: {
            uri: 'mongodb://localhost/ie-hotel-dev',
            options: {
                debug: true
            }
        },
        jwtSecret: ''
    },
    production: {
        ip: process.env.IP || undefined,
        port: process.env.PORT || 8080,
        mongo: {
            uri: '### adres serwera produkcyjnego ###',
        },
        jwtSecret: process.env.SECRET       // Nigdy nie trzymac hasel do produkcji w konfiguracji!
    }
}

module.exports = merge(config.all, config[config.all.env])