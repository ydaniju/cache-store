const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./app/config');
const router = require('./app/config/router');

const app = express();

// log to console in dev
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': true}));
// parse application/json
app.use(bodyParser.json());
app.use(router);
app.use(methodOverride);

// connecting MongoDB using mongoose to our application
mongoose.set('useCreateIndex', true);
mongoose.connect(
  config.db,
  {useNewUrlParser: true});
// this callback will be triggered on successful connection
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected successfully to ${config.db}`);
});

app.listen(config.port, (err) => {
  if (err) throw err;
  console.log(`App is listening on port ${config.port}`);
});
