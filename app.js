
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//Adding support for DUST Template Engine using consolidate js
var cons = require('consolidate');

var app = express();

// assign the dust engine to .dust files
app.engine('dust', cons.dust);
cons.dust.helpers = require('dustjs-helpers');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

//changing the view engine from default jade to dust
app.set('view engine', 'dust');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/* Defining Routes */
app.get('/',  function(req, res){res.redirect('/cnnbrk-tweets');});
app.get('/cnnbrk-tweets', routes.index);
/* End Defining Routes */

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
