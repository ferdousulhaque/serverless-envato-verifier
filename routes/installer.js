// models
// const Logging = require('../models/Logging');

// libs
// const ErrorHandler = require('../utils/errorHandler');

module.exports = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'After Installation, Send the Database SQL for the file!',
          // input: event,
        }),
      };
    callback(null, response);
};
