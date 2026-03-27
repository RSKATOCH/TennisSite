var express = require('express');
var router = express.Router();
var connection = require('../public/javascripts/sqlconnection');
var request = require('request');
var EventEmitter = require("events").EventEmitter;

var aws_instance = {"protocol":"http","host":"your-aws-instance"};

// var populatePlayers= function(player,raw,playerNo,fields) {
//     if(raw.Winner==player["P"+playerNo]) {
//         type="winner";
//     } else {
//         type="loser";
//     }
//     fields.forEach(function(field){
//         player["P"+playerNo+"_"+field]=[raw[type+"_"+field]]
//     })
// }

// var initializeData = function(p1,p2,gender,surface,fieldlist) {
//     player_data = {}
//     player_data["P1"]=[p1];
//     player_data["P2"]=[p2];
//     player_data["Gender"]=[gender];
//     player_data["Surface"]=[surface];
//     fieldlist.forEach(function(field){
//         player_data[field]=[0];
//     })
//     return player_data;
// }


/* GET versus */
router.get('/:p1/:p2', function(req, res, next) {
  if(req.params.p1===null || req.params.p2===null ||req.params.p1===undefined||req.params.p2===undefined||req.params.p1.trim()===""||req.params.p2.trim()==="") {
    res.status(500).json({error:"Incorrect player names"});
  }
  if(req.params.p1==req.param.p2) {
    res.status(500).json({error:"Both players cannot be same"});
  }
  var p1info = req.params.p1.split("_").join(" ")
  var p2info = req.params.p2.split("_").join(" ")
  var surface = req.query.surface;
  var gender = req.query.gender;
  var round = req.query.round;

  var queryEmitter = new EventEmitter();
  var requestEmitter = new EventEmitter();

  i = 0;
  
  queryEmitter.on('error', function(err){
      console.log(err);
      res.status(500).json({error:err});
  })
  
  result={}
  
  result["Surface"]=surface;
  result["Gender"]=gender;
  result["Round"]=round;
  queryEmitter.on('success', function(ires){
      for(key in ires) {
          result[key]=[ires[key]]
      }
      i++;
      if(i==5) {
          console.log("Database call successful");
          var requestEmitter = new EventEmitter();
          var responses = [];
          console.log(result)
          request.post({
              uri: aws_instance.protocol+"://"+aws_instance.host+"/predict",
              headers:{
                  'Content-Type': 'application/json; charset=utf-8'
              },
              body: JSON.stringify(result)
            }
          ,function(error,response,body) {
              if(error || (response.statusCode!=200 && response.statusCode!=304)) {
                res.status(500).json({'error':"Prediction error"});
              } else {
                resbodyjson = JSON.parse(body);
                if(resbodyjson.result=="0") {
                    winner = p2info;
                    loser = p1info;
                } else {
                    winner = p1info;
                    loser = p2info;
                }
                res.status(200).json({
                    "winner": winner,
                    "loser": loser
                });
                console.log(body);
                requestEmitter.emit('done');
              }
          })
      }
  })

  requestEmitter.on('done', function() {
      console.log("done");
        
    })

    requestEmitter.on('fail',function(error) {
        
    })

 var infoQuery = "(select ID as id, CONCAT(First,' ',LAST) AS Name from Player WHERE Gender=\""+ gender+"\" HAVING Name=\""+p1info +"\") \
  UNION (select ID as id, CONCAT(First,' ',LAST) AS Name from Player WHERE Gender=\""+ gender+"\" HAVING Name=\""+ p2info+"\")";
  console.log("Executing query: "+infoQuery);
  connection.query(infoQuery,function(err,rows,fields) {
    if(err) {
        console.log(err);
        res.status(500).json({error:err});
    }
    if(rows.length<2) {
        res.status(404).json({});
    }
    p1=rows[0].id;
    p2=rows[1].id;
    queries=["(SELECT distinct winner_total_wins AS P1_total_wins,winner_total_losses AS P1_total_losses FROM new_final WHERE Winner=\""+p1+"\" AND Gender=\""+gender+"\") UNION (SELECT distinct loser_total_wins AS P1_total_wins,loser_total_losses AS P1_total_losses FROM new_final WHERE Loser=\""+p1+"\"  AND Gender=\""+gender+"\")",
            "(SELECT distinct winner_surface_wins AS P1_surface_wins,winner_surface_losses AS P1_surface_losses FROM new_final WHERE Winner=\""+p1+"\" AND Gender=\""+gender+"\" AND Surface=\""+surface+"\") UNION (SELECT distinct loser_surface_wins AS P1_surface_wins,loser_surface_losses AS P1_surface_losses FROM new_final WHERE Loser=\""+p1+"\" AND Gender=\""+gender+"\" AND Surface=\""+surface+"\")",
            "(SELECT distinct winner_total_wins AS P2_total_wins,winner_total_losses AS P2_total_losses FROM new_final WHERE Winner=\""+p2+"\" AND Gender=\""+gender+"\") UNION (SELECT distinct loser_total_wins AS P2_total_wins,loser_total_losses AS P2_total_losses FROM new_final WHERE Loser=\""+p2+"\"  AND Gender=\""+gender+"\")",
            "(SELECT distinct winner_surface_wins AS P2_surface_wins,winner_surface_losses AS P2_surface_losses FROM new_final WHERE Winner=\""+p2+"\" AND Gender=\""+gender+"\" AND Surface=\""+surface+"\") UNION (SELECT distinct loser_surface_wins AS P2_surface_wins,loser_surface_losses AS P2_surface_losses FROM new_final WHERE Loser=\""+p2+"\" AND Gender=\""+gender+"\" AND Surface=\""+surface+"\")",
            "(SELECT distinct winner_ranking AS P2_ranking,winner_h2h AS P2_h2h,loser_ranking AS P1_ranking,loser_h2h AS P1_h2h FROM new_final WHERE Winner=\""+p2+"\" AND Loser=\""+p1+"\" AND Gender=\""+gender+"\") UNION (SELECT distinct winner_ranking AS P1_ranking,winner_h2h AS P1_h2h,loser_ranking AS P2_ranking,loser_h2h AS P2_h2h FROM new_final WHERE Winner=\""+p1+"\" AND Loser=\""+p2+"\" AND Gender=\""+gender+"\")"
            ]
//   var query = "SELECT distinct Winner,Loser,Gender,Surface,winner_ranking,loser_ranking,winner_h2h,loser_h2h,winner_total_losses,\
//     winner_surface_losses,loser_surface_losses,loser_total_losses ,winner_surface_wins,winner_total_wins,loser_surface_wins,loser_total_wins\
//     FROM final WHERE (Winner = \""+p1+"\" OR Loser = \""+p2+"\") OR (Winner = \""+p2+"\" OR Loser = \""+p1+"\") OR Surface = \""+surface+"\"";
//   console.log("Executing query: "+query)

    for(queryKey in queries) {
        query = queries[queryKey]
        console.log("Executin query: "+query)
    connection.query(query, function(err,rows,fields) {
        queryresult={}
        if(err) {
            queryEmitter.emit("error",err);
        } 
        if(rows.length==0) {
            fields.forEach(function(field){
                queryresult[field.name] = 0
            })
            queryEmitter.emit("success",queryresult)
        }
        else {
            fields.forEach(function(field){
                queryresult[field.name] = rows[0][field.name]
            })
            queryEmitter.emit("success",queryresult)
        }    
    });
    }})

});

module.exports = router;