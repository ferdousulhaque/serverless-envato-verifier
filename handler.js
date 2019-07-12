'use strict';
// add configurations
require('dotenv').config();

const verifier = require('./routes/verifier.js');
const installer = require('./routes/installer.js');

module.exports = {
  verifier,
  installer
};