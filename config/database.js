/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const config = require('./index');

const db = mongoose.connect(config.mongo_uri, 
  { useUnifiedTopology: true, 
    useNewUrlParser: true 
  })
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error('Error has occurred', Error));

module.exports = db;
