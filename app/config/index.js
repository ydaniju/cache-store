const development = require('./development.config');
const production = require('./production.config');

module.exports = process.env
    .NODE_ENV == 'production' ? production : development;
