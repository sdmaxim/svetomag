//Connection
//var http = require('http');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();


//MySQL DB
var mysql = require('mysql');
var mysql_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'svetomag_main'
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

//mysql_connection.connect();

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

app.post('/', function (req, res) {

    var msg = req.body.prod_id;
    //var response_msg;
    console.log(msg);

    mysql_connection.query(
        'SELECT product_id, product_name FROM jos_vm_product LIMIT 0, ' + msg,
        function (err, rows) {

            if (err) throw err;
            console.log(rows);
            res.send(rows);
            res.end();
            //mysql_connection.end();
        }
    );
});

app.listen(3000, function () {
    console.log('listening on *:3000');
});


