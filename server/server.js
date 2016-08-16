var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var auth = require('./auth');

var app = express();
var router = express.Router();

//MySQL DB
var mysql = require('mysql');
var mysql_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'svetomag_main'
});

// middleware

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/data')));
app.use(router); //Связь между app и router

router.get('/restricted', auth.restrict, function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

router.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    auth.getLoginStatus(req, res);
  });
});

router.get('/json/*.json', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  console.log("***");
});

router.post('/get-prod', function(req, res){
  var prodId = req.body.prodId;
  mysql_connection.query(
    'SELECT product_id, product_name FROM product LIMIT 0, ' + msg,
    function (err, rows) {

        if (err) throw err;
        console.log(rows);
        res.send(rows);
        res.end();
        //mysql_connection.end();
    }
  );
  console.log(msg);
});

router.post('/get-menu', function(req, res){
  var menuType = req.body.menuType;
  mysql_connection.query(
    'SELECT category.name, category.id, category.url ' +
    'FROM category, category_xref ' +
    'WHERE (category_xref.parent_id = "0") AND ' +
    '(category_xref.child_id = category.id) LIMIT 0, 15',
    function (err, rows) {

        if (err) throw err;
        console.log(rows);
        res.send(rows);
        res.end();
        //mysql_connection.end();
    }
  );
  console.log(menuType + "+++");
});

router.post('/login', function(req, res){
  auth.authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation

      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        auth.getLoginStatus(req, res);
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      auth.getLoginStatus(req, res);
    }
  });
});

router.get('/auth', auth.getLoginStatus);

// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});


/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  var now = new Date();
  var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  console.log('Express started on port 3000, time:', time);
}
