'use strict';

module.exports.verifier = (event, context, callback) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const request = require('request');
    
    request.get({
      "headers": {  'Authorization': 'Bearer n637nan0bj2ElHhr2O4cTpnhwvUffnyV',
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
  
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

// Redirect Port 80 to Port 443
/* var http = require('http');
http.createServer(app).listen(3000); */