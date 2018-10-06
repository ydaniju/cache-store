const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const router = require('../config/router');
const app = express();

// log to console in dev
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': true}));
// parse application/json
app.use(bodyParser.json());
app.use(router);
app.use(methodOverride);

module.exports = app;
