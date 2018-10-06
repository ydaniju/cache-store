const mongoose = require('mongoose');
const app = require('./app');
const config = require('./app/config');

// connecting MongoDB using mongoose to our application
mongoose.set('useCreateIndex', true);
mongoose.connect(
  config.db,
  {useNewUrlParser: true},
);

// this callback will be triggered on successful connection
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected successfully to ${config.db}`);
});

app.listen(config.port, (err) => {
  if (err) throw err;
  console.log(`App is listening on port ${config.port}`);
});
