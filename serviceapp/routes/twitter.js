var express = require('express');
var router = express.Router();
var connection = require('../public/javascripts/sqlconnection');

/* GET player information */
router.get('/players', function(req, res, next) {

  var playerNameQuery = "SELECT distinct CONCAT(First,' ',Last) AS name FROM Player p JOIN (SELECT PlayerID,Gender FROM recent_ranking WHERE Position<20) r ON (p.ID=r.PlayerID AND p.Gender=r.Gender) ORDER BY name";
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
