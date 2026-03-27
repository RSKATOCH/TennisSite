var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'your-host',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database'
});

/*connection.connect(function(err) {
  if (err) {
    console.log("Error Connection to DB" + err);
    return;
  }
  console.log("Connection established...");
});*/

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'headtohead.html'));
});

router.get('/headtohead', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'headtohead.html'));
});

router.get('/tournament', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'tournament.html'));
});

router.get('/twittersentiment', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'twittersentiment.html'));
});

router.get('/playerpage', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'playerpage.html'));
});


// To add a new page, use the templete below
/*
router.get('/routeName', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'fileName.html'));
});
*/

// Login uses POST request
router.post('/login', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username

  var query = "INSERT query here"; /* Write your query here and uncomment line 21 in javascripts/app.js*/
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success'
      });
    }
  });
});

router.get('/h2h', function(req, res) {
  // req.body contains the json data sent from the loginController  

  var query = ""  /* Write your query here*/
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('select error: ', err);
    else {
      for (i in rows) {
        console.log("PLAYER RESPONSE ", rows[i]);
      }
      res.json(rows);
    }
  });
});

// template for GET requests
/*
router.get('/routeName/:customParameter', function(req, res) {

  var myData = req.params.customParameter;    // if you have a custom parameter
  var query = '';

  // console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});
*/

module.exports = router;
