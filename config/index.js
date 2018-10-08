const development = require('./development.config');
const production = require('./production.config');
const test = require('./test.config');

const localEnv = process.env.NODE_ENV == 'development' ? development : test;

module.exports = process.env.NODE_ENV == 'production' ? production : localEnv;
