
/*
var options = {
  host: 'https://api.instagram.com',
  port: 80,
  path: "/oauth/authorize/?client_id=ee3&redirect_uri=http://localhost:3000/auth/instagram/callback&response_type=token"
};
*/

/*
console.log("requestify before")
requestify.get('https://api.instagram.com/oauth/authorize/?client_id=6baee3&redirect_uri=http://localhost:3000/auth/instagram/callback&response_type=token').then(function(response) {
	// Get the response body
	response.getBody();
	console.log("requestify");
});
*/

/*
http.get(options, function(resp){
  console.log("http complete")
  //resp.on('data', function(chunk){
    //do something with chunk
  //});
}).on("error", function(e){
  console.log("Got error: " + e.message);
});
*/
// var InstagramNodeLib = require('instagram-node-lib');
// var instagram = require('node-instagram').default;

/* Instagram Auth
InstagramNodeLib.set ('client_id', '');
InstagramNodeLib.set ('client_secret', '');
InstagramNodeLib.set('redirect_uri', 'http://localhost:4000');

// Authorise instagram
app.get('/oauth', function(request, response){
  console.log('request');
  console.log(request.body);
  console.log('response');
  // console.log(response);
  console.log('/oauth');
  InstagramNodeLib.oauth.ask_for_access_token({
    request: request,
    response: response,
    redirect: "http://localhost:4000/good",    // optional
    complete: function(params, response){
      console.log('/oauth = complete');
      // params['access_token']
      // params['user']
      // console.log("params");
      // console.log(params);
      // response.writeHead(200, {'Content-Type': 'text/plain'});
      // or some other response ended with
      response.end();
    },
    error: function(errorMessage, errorObject, caller, response){
      console.log('/oauth = error');
      // errorMessage is the raised error message
      // errorObject is either the object that caused the issue, or the nearest neighbor
      // caller is the method in which the error occurred
      //response.writeHead(406, {'Content-Type': 'text/plain'});
      // or some other response ended with
      response.end();
    }
  });
  console.log('/oauth end');
  return null;
});

/*Test Instagram
InstagramNodeLib.tags.info({
  name: 'blue',
  complete: function(data){
    console.log(data);
  },
  error: function(data){
    console.log('error ' + data);
  }
});
// Alt test
InstagramNodeLib.media.popular({
  complete: function(data){
    console.log(data);
  },
  error: function(data){
    console.log('error ' + data);
  }
});
*/
