const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const router = require('../config/router');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// log to console in dev
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': true}));
// parse application/json
app.use(bodyParser.json());
app.use(router);

module.exports = app;
