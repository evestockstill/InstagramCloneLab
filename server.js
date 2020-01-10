/* eslint-disable no-unused-vars */
require('dotenv').config();



const app = require('./lib/app');


const config = require('./config');
const db = require('./config/database');

app.listen(config.port, console.log('Server started on http://localhost:%s', config.port));
