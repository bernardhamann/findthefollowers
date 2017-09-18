var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var firebase = require('firebase');
var app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

// Start Firebase
var FirebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID
}
firebase.initializeApp(FirebaseConfig);
var InstagramCode = firebase.database().ref('instagram/code');
var InstagramToken = firebase.database().ref('instagram/token');

// Instagram Auth Codes
// var clientId = process.env.INSTAGRAM_CLIENTID;
var clientId = "6be47e7d8ad240f0a3e2fe038e6eaee3";
var clientSecret = process.env.INSTAGRAM_CLIENTSECRET;

// Your redirect url where you will handle the code param
var redirectUri = 'http://54.213.76.216:3010/instagram/auth/callback';

// https://www.instagram.com/developer/authentication/
// Instagram Auth url
var instagramAuthUrl = 'https://api.instagram.com/oauth/authorize/?client_id='+ clientId + "&redirect_uri=" + redirectUri + "&response_type=code"
// "https://api.instagram.com/oauth/authorize/?client_id=6be47e7d8ad240f0a3e2fe038e6eaee3&redirect_uri=http://54.213.76.216:3010/instagram/auth/callback&response_type=code"

// Trigger the auth request
app.get('/instagram/auth', function (req, res) {
  console.log('/instagram/auth');
  res.redirect(instagramAuthUrl)
});

// Handle the callback with the code after user granted permission.
app.get('/instagram/auth/callback', function (req, res) {
  console.log('/instagram/auth/callback');
  if (req.code){
    var newCode = req.code;
    InstagramCode.set(newCode);
    res.send(newCode);
  }
  else {
    /*
    if (error_reason){
        res.send("Code Error: " + error_reason);
    }
    */
    res.send("Code Error");
  }
});

// Use the code to request the access token
app.get('/instagram/gettoken', function (req, res) {

  console.log('/instagram/gettoken');
  // do the post request to instagram
  // curl -F 'client_id=CLIENT_ID' \
  // -F 'client_secret=CLIENT_SECRET' \
  // -F 'grant_type=authorization_code' \
  // -F 'redirect_uri=AUTHORIZATION_REDIRECT_URI' \
  // -F 'code=CODE' \
  // https://api.instagram.com/oauth/access_token

  res.send("/instagram/gettoken")

});

// Handle the access token request callback
app.get('/instagram/gettoken/callback', function (req, res) {

  var newToken = req.body
  InstagramToken.set(newToken);

  /*
  Succcessfull response should look like this
  {
      "access_token": "fb2e77d.47a0479900504cb3ab4a1f626d174d2d",
      "user": {
          "id": "1574083",
          "username": "snoopdogg",
          "full_name": "Snoop Dogg",
          "profile_picture": "..."
      }
  }
  */

  res.send("/instagram/gettoken/callback")

});

var server = app.listen(3010, function(){
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://"+ "localhost:" + port)
});
