/////////////////////////////
////    server side     ////
///////////////////////////

// var routes = require('./routes');
// var user = require('./routes/user');

// dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var errorhandler = require('errorhandler')
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require("body-parser");

var db = require('./routes/db');
var user = require('./routes/user');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'keyboard cat',
	cookie: {maxAge: 60000}
}));


// development only
if ('development' == app.get('env')) {
	app.use(errorhandler());
}

app.route('/').get(user.index);
app.route('/login').post(user.login);
app.route('/getlogin').post(user.getLogin);

app.route('/get_product_info').get(db.get_product_info);
app.route('/category_list').get(db.category_list);
app.route('/searching').get(db.searching);

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
