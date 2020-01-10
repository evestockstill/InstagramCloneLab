/* eslint-disable no-undef */
const express = require('express');
const app = express();
// const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

app.use(express.json());
app.use(cors);


// app.use(express.static(__dirname + '/../public'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use (require('./middleware/error'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));
app.use(cookieParser());



module.exports = app;


