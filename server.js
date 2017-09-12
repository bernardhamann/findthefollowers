var express = require('express');
// var http = require('http');
// var requestify = require('requestify');

var request = require('request');

var bodyParser = require('body-parser');

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Example "https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=token";
var instagramAuthUrl = "https://api.instagram.com/oauth/authorize/?client_id=6be47e7d8ad240f0a3e2fe038e6eaee3&redirect_uri=http://54.213.76.216:3010/auth/instagram/callback&response_type=token";


var clientId = process.env.clientId;
var clientSecret = process.env.clientSecret;

// Your redirect url where you will handle the code param
var redirectUri = 'http://54.213.76.216:3010/auth/instagram/callback';

// First redirect user to instagram oauth
app.get('/tt', function (req, res) {
  console.log("request");
  request('https://api.instagram.com/oauth/authorize/?client_id=6be47e7d8ad240f0a3e2fe038e6eaee3&redirect_uri=http://localhost:3000/auth/instagram/callback&response_type=token', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    res.send(body);
  });
});

// Handle auth code and get access_token for user
app.get('/auth/instagram/callback', function (req, res) {
  try {
    // The code from the request, here req.query.code for express
    // var code = req.query.code;
    // var data = instagram.authorizeUser(code, redirectUri);
    // data.access_token contain the user access_token
    console.log(reg.params)
    console.log(reg)
    console.log(res)
    console.log(reg.params)
    res.json(req);
  } catch (err) {
    res.json(err);
  }
});

var server = app.listen(3000, function(){
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://"+ "localhost:" + port)
});
