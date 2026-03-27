var express = require('express');
var router = express.Router();
var connection = require('../public/javascripts/sqlconnection');

/* GET player information */
router.get('/:name', function(req, res, next) {
  if(req.params.name===null||req.params.name===undefined||req.params.name.trim()==="") {
    res.status(500).json({error:"Incorrect player name"});
  }
  name = req.params.name.split("_").join(" ");
  console.log(name);
  var playerInfoQuery = "select p.ID AS id,First as firstName,Last as lastName,Name as fullName,DOB,Country,NumOfTitles,YearTurnedPro,DominantHand,p.Gender,MemberOf,Position As latestRank,Points,Date AS rankingDAte FROM Ranking r JOIN (select \
    ID,CONCAT(First,' ',LAST) AS Name, First,Last, DOB, Country,NumOfTitles,YearTurnedPro,DominantHand,Gender,MemberOf from Player HAVING Name=\""+name+"\") p ON p.ID=r.PlayerID AND p.Gender=r.Gender \
  WHERE Date = (select max(Date) from Ranking Where PlayerID=p.ID AND Gender=p.Gender)";
  console.log("Executing query: "+playerInfoQuery)
  connection.query(playerInfoQuery, function(err,rows,fields) {
    if(err) {
      console.log(err);
      res.status(500).json({error:err});
    }
    if(rows.length==0) {
      res.status(404).json({});
    }
    var row = rows[0];
    result = {}
    fields.forEach(function(field){
      result[field.name] = row[field.name]
    })
    console.log(result);
    var matchesQuery = "select First as winnerFirstName, Last as winnerLastName,loserFirstName,loserLastName, TournamentName,round FROM Player win JOIN \
    (select First as loserFirstName, Last as loserLastName, TournamentName,Winner,round FROM Player los JOIN \
    (select Name AS TournamentName,v.Winner AS Winner,v.Loser as Loser,Round AS round FROM Tournament t JOIN \
    (select * FROM Versus WHERE ((Winner=\""+ result.id+"\") OR (Loser=\""+result.id+"\")) AND Gender=\""+result.Gender+"\" ORDER BY Date DESC LIMIT 5) v ON t.ID=v.TournamentID) temp1 ON temp1.Loser=los.ID) temp2 \
    ON win.ID=temp2.Winner;";
    connection.query(matchesQuery, function(err,rows,fields) {
      if(err) {
        console.log(err);
        res.status(500).json({error:err});
      }
      if(rows.length==0) {
        result.latestMatches = []
      } else {
        result.latestMatches = []
        
        for(i=0;i<rows.length;i++) {
          matchresult = {}
          fields.forEach(function(field){
            matchresult[field.name] = rows[i][field.name]
          })
          result.latestMatches.push(matchresult);
        }
      }
      res.json(result);
    })
  })
});

module.exports = router;
