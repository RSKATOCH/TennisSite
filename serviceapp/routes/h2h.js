var express = require('express');
var router = express.Router();
var connection = require('../public/javascripts/sqlconnection');

/* GET player information */
router.get('/:p1/:p2', function(req, res, next) {
gender=req.query.gender;
    
  if(req.params.p1===null || req.params.p2===null ||req.params.p1===undefined||req.params.p2===undefined||req.params.p1.trim()===""||req.params.p2.trim()==="") {
    res.status(500).json({error:"Incorrect player names"});
  }
  if(req.params.p1==req.param.p2) {
    res.status(500).json({error:"Both players cannot be same"});
  }
  p1param = req.params.p1.split("_").join(" ")
  p2param = req.params.p2.split("_").join(" ")
  var playerInfoQuery = "select p.ID AS id,First as firstName,Last as lastName,Name as fullName,DOB,Country,NumOfTitles,YearTurnedPro,DominantHand,p.Gender,MemberOf,Position As latestRank,Points,Date AS rankingDate FROM Ranking r JOIN (select ID,CONCAT(First,' ',LAST) AS Name, First,Last, DOB, Country, NumOfTitles,YearTurnedPro,DominantHand,Gender,MemberOf from Player HAVING Name=\""+p1param+"\") p ON p.ID=r.PlayerID AND p.Gender=r.Gender \
  WHERE Date = (select max(Date) from Ranking Where PlayerID=p.ID AND Gender=p.Gender) UNION select p.ID AS id,First as firstName,Last as lastName,Name as fullName,DOB,Country,NumOfTitles,YearTurnedPro,DominantHand,p.Gender,MemberOf,Position As latestRank,Points,Date AS rankingDate FROM Ranking r JOIN (select ID,CONCAT(First,' ',LAST) AS Name, First,Last, DOB, Country,NumOfTitles,YearTurnedPro,DominantHand,Gender,MemberOf from Player HAVING Name=\""+p2param+"\") p ON p.ID=r.PlayerID AND p.Gender=r.Gender \
  WHERE Date = (select max(Date) from Ranking Where PlayerID=p.ID AND Gender=p.Gender)";
  console.log("Executing query: "+playerInfoQuery)
  connection.query(playerInfoQuery, function(err,rows,fields) {
    if(err) {
      console.log(err);
      res.status(500).json({error:err});
    }
    if(rows.length<2) {
      res.status(404).json({});
    }
    var p1 = rows[0];
    var p2 = rows[1];
    result = {}
    result.p1 = {}
    result.p2= {}
    fields.forEach(function(field){
      result.p1[field.name] = p1[field.name]
      result.p2[field.name] = p2[field.name]
    })
    console.log(result);
    var matchesQuery = "select First as winnerFirstName, Last as winnerLastName,loserFirstName,loserLastName, TournamentName,round FROM Player win JOIN \
    (select First as loserFirstName, Last as loserLastName, TournamentName,Winner,round FROM Player los JOIN \
    (select Name AS TournamentName,v.Winner AS Winner,v.Loser as Loser,Round AS round FROM Tournament t JOIN \
    (select * FROM Versus WHERE ((Winner=\""+ p1.id+"\" AND Loser=\""+ p2.id+"\") OR (Loser=\""+p1.id+"\" AND Winner=\""+ p2.id+"\")) AND Gender=\""+p1.Gender+"\" ORDER BY Date DESC LIMIT 5) v ON t.ID=v.TournamentID) temp1 ON temp1.Loser=los.ID) temp2 \
    ON win.ID=temp2.Winner;";
    connection.query(matchesQuery, function(err,rows,fields, next) {
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
