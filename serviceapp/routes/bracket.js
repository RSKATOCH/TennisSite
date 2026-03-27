var express = require('express');
var router = express.Router();
var connection = require('../public/javascripts/sqlconnection');

/* GET player information */
router.get('/', function(req, res, next) {
  if(req.query.gender===null||req.query.gender===undefined||req.query.gender.trim()==="") {
    res.status(500).json({error:"Incorrect gender sent"});
  }
  
  //These can be changed for later use
  position = 50;
  draw = 16;

  var playerNameQuery = "SELECT ID as id,CONCAT(First,' ',Last) AS Name FROM Player WHERE Gender=\""+req.query.gender+"\" AND ID IN (SELECT distinct PlayerID FROM Ranking WHERE Gender=\""+req.query.gender+"\" \
  AND Position<"+ position+") ORDER BY RAND() LIMIT "+draw;
  console.log("Executing query: "+playerNameQuery)
  connection.query(playerNameQuery, function(err,rows,fields) {
    if(err) {
      console.log(err);
      res.status(500).json({error:err});
    }
    if(rows.length==0) {
      res.status(404).json({});
    }
    result = []
    rows.forEach(function(row) {
        player = {}
        fields.forEach(function(field){
            player[field.name] = row[field.name]
        })
        result.push(player)
    })
    
    console.log(result);
    
    res.json(result);
  })
});

module.exports = router;
