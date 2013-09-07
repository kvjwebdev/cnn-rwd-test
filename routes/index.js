
/*
 * GET home page.
 */

//Request -- Simplified HTTP client
var request = require('request');

//For URL Querystring
var qs = require('querystring');

// Twitter Configuration
var twitterConf = {
	"url": "https://api.twitter.com/1.1/statuses/user_timeline.json?",
	"screen_name": "cnnbrk",
	"tweet_count": 10,
	//Generated from dev.twitter.com
	"oauth_consumer_key": "f9zIubD1kkrqkTNKC6PJLw",
  "oauth_nonce": "0313ca13a06984f02092ef614f9cd14a",
  "oauth_signature": "d6XWf78UE7Te%2BUmBc3%2BApXunqiA%3D",
  "oauth_signature_method": "HMAC-SHA1",
	"oauth_token": "600780857-fnyOmt5IJOc2j62g6kXOJsFhBStubuyo8rP2PRdl",
  "oauth_version":'1.0'
};

exports.index = function(req, res){
    //Twitter OAuth 1.1 requires OAuth authentication for API calls. 1.0 is deprecated
  	var oauth =
        { 
        	oauth_consumer_key: twitterConf.oauth_consumer_key,
          oauth_nonce: twitterConf.oauth_nonce,
          oauth_signature: twitterConf.oauth_signature,
        	oauth_token: twitterConf.oauth_token,
        	oauth_version: twitterConf.oauth_version
        },
  	params =
        { 
        	count: twitterConf.tweet_count,  
          screen_name: twitterConf.screen_name
        },
	url = twitterConf.url + qs.stringify(params);
 //  console.log(url);
 //  console.log(oauth);
	// //HTTP Get Request to Twitter URL to fetch the Tweets JSON
	request.get({url:url, oauth:oauth}, function (error, response, body) {
  		// console.log(error);
    //   console.log(response);
    //   console.log(body);
  		res.render('index',{tweet:response[0]});
	});
}