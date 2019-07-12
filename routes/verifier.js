// models
// const Logging = require('../models/Logging');

// libs
// const ErrorHandler = require('../utils/errorHandler');

module.exports = (event, context, callback) => {
    try {
        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    
        const request = require('request');
        
        request.get({
          "headers": {  'Authorization': 'Bearer '+process.env.ENVATO_PERSONAL_TOKEN,
                        'Content-Length': 0,
                        'Content-Type': 'application/json' },
          "url": "https://api.envato.com/v3/market/author/sale?code=" + body.envato_code,
        }, (error, response, body) => {
            if(error) {
              callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                  message: JSON.parse(error)
                }, null, 2),
              });
            }else{
              callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                  message: JSON.parse(body)
                }, null, 2),
              });
            }
        });
      } catch (e) {
        console.log('catch block ran')
        console.log(e)
        callback(null, failure({
            status: false
        }))
      }
};
