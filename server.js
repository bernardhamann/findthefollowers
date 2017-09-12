var express = require('express');
var request = require('request');
var firebase = require('firebase');
var app = express()

app.use(express.static('public'));

// Start Firebase
var FirebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID
}
firebase.initializeApp(config);
var InstagramToken = firebase.database().ref('instagram/token');

// Instagram Auth Codes
// var clientId = process.env.INSTAGRAM_CLIENTID;
var clientId = "6be47e7d8ad240f0a3e2fe038e6eaee3";
var clientSecret = process.env.INSTAGRAM_CLIENTSECRET;

// Your redirect url where you will handle the code param
var redirectUri = 'http://54.213.76.216:3010/instagram/auth/callback';
// Instagram Auth url
var instagramAuthUrl = 'https://api.instagram.com/oauth/authorize/?client_id='+ clientId + "&redirect_uri=" + redirectUri + "&response_type=token";

// First redirect user to instagram oauth
app.get('/instagram/auth', function (req, res) {
  console.log('/instagram/auth');
  res.redirect(instagramAuthUrl)
});

// Handle auth code and get access_token for user
app.get('/instagram/auth/callback', function (req, res) {
  var newToken = req.params;
  InstagramToken.set(newToken);
});

var server = app.listen(3010, function(){
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://"+ "localhost:" + port)
});
