
/*
 * Twitter GET home page.
 */

//Using Twitter API Client for Node: https://github.com/ttezel/twit
var Twit = require('twit');

var T = new Twit({
    consumer_key:         'f9zIubD1kkrqkTNKC6PJLw'
  , consumer_secret:      'X5QJBphK1WEZ5X1QMOMamZ0RHxy4X35KpZBFbwXyek'
  , access_token:         '600780857-fnyOmt5IJOc2j62g6kXOJsFhBStubuyo8rP2PRdl'
  , access_token_secret:  'XAn8qvkNdr5xPF0qD88WL2l9QEaPqS9Jf79IZjEbU'
})


exports.index = function(req, res){
  T.get('statuses/user_timeline', { screen_name: 'cnnbrk', count: 10 },  function (err, reply) {
    res.render('index',{
        "json": reply
      });
  });
}