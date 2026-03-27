var app = angular.module('angularjsNodejsTutorial', []);
app.controller('playerController', function($scope, $http) {
  $scope.getPlayerInfo = function() {
    $scope.ifPlayerSubmitted = true;
    first_name = $scope.first_name;
    last_name = $scope.last_name;

    if (first_name != null && first_name != '' && last_name != null && last_name != '') {
      first_name = first_name.charAt(0).toUpperCase()+first_name.substring(1).toLowerCase();
      last_name = last_name.charAt(0).toUpperCase() + last_name.substring(1).toLowerCase();

      var request = $http({
        url: 'http://your-api-endpoint/player/'+first_name+'_'+last_name,
        method: "GET",
      })

      request.success(function(player_data) {
        $scope.playername = player_data.firstName+" "+player_data.lastName;
        $scope.DOB = player_data.DOB;
        $scope.DOByear = $scope.DOB.substring(0, 4);
        $scope.DOBmonth = $scope.DOB.substring(4, 6)
        $scope.DOBday = $scope.DOB.substring(6, 8);
        $scope.NumOfTitles = player_data.NumOfTitles;
        $scope.YearTurnedPro = player_data.YearTurnedPro;
        $scope.DominantHand = player_data.DominantHand;
        $scope.Gender = player_data.Gender;
        $scope.latestRank = player_data.latestRank;
        $scope.latestMatches = player_data.latestMatches;
      });

      request.error(function(err) {
        console.log("error: ", err);
      });
    } else {
      var validation_error = document.getElementById("badInputName");
      validation_error.style.display = "block";
    }
  }
});

app.controller('tournamentController', function($scope, $http) {
  $scope.getPlayers = function() {
    var request = $http({
      url: 'http://your-api-endpoint/bracket?gender=' + $scope.assoc, //tt3896198',
      method: "GET",
    })
    request.success(function(response) {
      // success
      console.log(response)
      $scope.availableTournamentPlayers = [];
      console.log(response.length);
      for (i =0; i< response.length; i++) {
        console.log(response[i].Name);
        $scope.availableTournamentPlayers.push(response[i].Name);
      }
      console.log($scope.availableTournamentPlayers);
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
  };
  $scope.semi1A = "";
  $scope.semi1B = "";
  $scope.semi2A = "";
  $scope.semi2B = "";

  $scope.finalA = "";
  $scope.finalB = "";

  $scope.finalwinner = "";

  $scope.getTournamentResults = function() {
    $scope.semi1A = "";
    $scope.semi1B = "";
    $scope.semi2A = "";
    $scope.semi2B = "";

    $scope.finalA = "";
    $scope.finalB = "";

    $scope.finalwinner = "";
    var gender = $scope.assoc;
    var surface = $scope.selectedCourtType;
    round = 'QF';
    var p1name = $scope.seedone.replace(/\s/gi, "_");
    var p2name = $scope.seedeight.replace(/\s/gi, "_");
    console.log('http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round);
    var request = $http({
      url: 'http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round, //tt3896198',
      method: "GET",
    })
    request.success(function(response) {
      var spanList = document.getElementsByTagName("li");
      for (var i = 0, len = spanList.length; i < len; i++)
      {
        //if(spanList[i].textContent === response.winner) // use .innerHTML if you need IE compatibility
        //  spanList[i].className += " winner";
      } 
      $scope.semi1A = response.winner;
      console.log("SEMI1A: " + response.winner);

      p1name = $scope.seedfive.replace(/\s/gi, "_");
      p2name = $scope.seedfour.replace(/\s/gi, "_");
      console.log('http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round);
      var request = $http({
        url: 'http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round, //tt3896198',
        method: "GET",
      })
      request.success(function(response) {
        var spanList = document.getElementsByTagName("li");
        for (var i = 0, len = spanList.length; i < len; i++)
        {
          //if(spanList[i].textContent === response.winner) // use .innerHTML if you need IE compatibility
          //  spanList[i].className += " winner";
        } 
        $scope.semi1B = response.winner;
        console.log("SEMI1B: " + response.winner);

        p1name = $scope.seedthree.replace(/\s/gi, "_");
        p2name = $scope.seedsix.replace(/\s/gi, "_");
        console.log('http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round);
        var request = $http({
          url: 'http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round, //tt3896198',
          method: "GET",
        })
        request.success(function(response) {
          var spanList = document.getElementsByTagName("li");
          for (var i = 0, len = spanList.length; i < len; i++)
          {
            //if(spanList[i].textContent === response.winner) // use .innerHTML if you need IE compatibility
            //  spanList[i].className += " winner";
          } 
          $scope.semi2A = response.winner;
          console.log("SEMI2A: " + response.winner);



          
          p1name = $scope.seedseven.replace(/\s/gi, "_");
          p2name = $scope.seedtwo.replace(/\s/gi, "_");
          console.log('http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round);
          var request = $http({
            url: 'http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round, //tt3896198',
            method: "GET",
          })
          request.success(function(response) {
            var spanList = document.getElementsByTagName("li");
            for (var i = 0, len = spanList.length; i < len; i++)
            {
              //if(spanList[i].textContent === response.winner) // use .innerHTML if you need IE compatibility
              //  spanList[i].className += " winner";
            } 
            $scope.semi2B = response.winner;
            console.log("SEMI2B: " + response.winner);
            round = 'SF';
            p1name = $scope.semi1A.replace(/\s/gi, "_");
            p2name = $scope.semi1B.replace(/\s/gi, "_");
            console.log('http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round);
            var request = $http({
              url: 'http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round, //tt3896198',
              method: "GET",
            })
            request.success(function(response) {
              var spanList = document.getElementsByTagName("li");
              for (var i = 0, len = spanList.length; i < len; i++)
              {
                //if(spanList[i].textContent === response.winner) // use .innerHTML if you need IE compatibility
                //  spanList[i].className += " winner";
              } 
              $scope.finalA = response.winner;
              console.log("FINALA: " + response.winner);

              
              p1name = $scope.semi2A.replace(/\s/gi, "_");
              p2name = $scope.semi2B.replace(/\s/gi, "_");
              console.log('http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round);
              var request = $http({
                url: 'http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round, //tt3896198',
                method: "GET",
              })
              request.success(function(response) {
                var spanList = document.getElementsByTagName("li");
                for (var i = 0, len = spanList.length; i < len; i++)
                {
                  //if(spanList[i].textContent === response.winner) // use .innerHTML if you need IE compatibility
                  //  spanList[i].className += " winner";
                } 
                $scope.finalB = response.winner;
                console.log("FINALB: " + response.winner);
                round = 'F';
                p1name = $scope.finalA.replace(/\s/gi, "_");
                p2name = $scope.finalB.replace(/\s/gi, "_");
                console.log('http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round);
                var request = $http({
                  url: 'http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round, //tt3896198',
                  method: "GET",
                })
                request.success(function(response) {
                  var spanList = document.getElementsByTagName("li");
                  for (var i = 0, len = spanList.length; i < len; i++)
                  {
                    //if(spanList[i].textContent === response.winner) // use .innerHTML if you need IE compatibility
                    //  spanList[i].className += " winner";
                  } 
                  $scope.finalwinner = response.winner;
                  console.log("FINAL WINNER: " + response.winner);

                });
                request.error(function(err) {
                  // failed
                  console.log("error: ", err);
                  reject(err);
                });

              });
              request.error(function(err) {
                // failed
                console.log("error: ", err);
                reject(err);
              });
            });
            request.error(function(err) {
              // failed
              console.log("error: ", err);
              reject(err);
            });
          });
          request.error(function(err) {
            // failed
            console.log("error: ", err);
            reject(err);
          });
        });
        request.error(function(err) {
          // failed
          console.log("error: ", err);
          reject(err);
        });
      });
      request.error(function(err) {
        // failed
        console.log("error: ", err);
        reject(err);
      });
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
      reject(err);
    });
  };

  $scope.getTournamentResults2 = function() {
    var gender = $scope.assoc;
    var surface = $scope.selectedCourtType;
    var promisearray = [];
    var promisearray2 = [];
    var promisearray3 = [];
    var round = 'QF';
    //$scope.seedone
    //$scope.seedeight


    promisearray.push($scope.getMatchupResult($scope.seedone, $scope.seedeight, surface, gender, round, '1A'));
    promisearray.push($scope.getMatchupResult($scope.seedfive, $scope.seedfour, surface, gender, round, '1B'));
    promisearray.push($scope.getMatchupResult($scope.seedthree, $scope.seedsix, surface, gender, round, '2A'));
    promisearray.push($scope.getMatchupResult($scope.seedseven, $scope.seedtwo, surface, gender, round, '2B'));
    


    Promise.all(promisearray)
      .then(() => {
        console.log("IN PROMISEALL THEN FUNC");
        var round = 'SF';
        promisearray2.push($scope.getMatchupResult($scope.semi1A, $scope.semi1B, surface, gender, round, 'A'));
        promisearray2.push($scope.getMatchupResult($scope.semi2A, $scope.semi2B, surface, gender, round, 'B'));

        Promise.all(promisearray)
        .then(() => {
          console.log("IN PROMISEALL THEN FUNC");
          var round = 'F';
          promisearray3.push($scope.getMatchupResult($scope.finalA, $scope.finalB, surface, gender, round, 'F'));
        });
      });

  };

  $scope.getMatchupResult2 = function(playerone, playertwo, surface, gender, round) {
    /*var p1array = playerone.split(" ");
    var p2array = playertwo.split(" ");
    var p1first = p1array[0];
    var p1last = p1array[1];
    var p2first = p2array[0];
    var p2last = p2array[1];*/
    

  };
  $scope.getMatchupResult = function(playerone, playertwo, surface, gender, round, param) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
          var winner = "";
          var p1name = playerone.replace(/\s/gi, "_");
          var p2name = playertwo.replace(/\s/gi, "_");
          console.log('http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round);
          var request = $http({
            url: 'http://your-api-endpoint/versus/'+ p1name +'/'+ p2name +'?surface='+ surface + '&gender=' + gender + '&round=' + round, //tt3896198',
            method: "GET",
          })
          request.success(function(response) {
            // success
            console.log("SUCCESS");
            console.log(response.winner);
            console.log(response.loser);
            console.log(response);
            var spanList = document.getElementsByTagName("li");
            for (var i = 0, len = spanList.length; i < len; i++)
            {
              if(spanList[i].textContent === playerone) // use .innerHTML if you need IE compatibility
                spanList[i].className += " winner";
            } 
            winner = response.winner;
            if (param === '1A') {
              $scope.semi1A = winner;
            } else if (param === '1B') {
              $scope.semi1B = winner;
            } else if (param === '2A') {
              $scope.semi2A = winner;
            } else if (param === '2B') {
              $scope.semi2B = winner;
            } else if (param === 'A') {
              $scope.finalA = winner;
            } else if (param === 'B') {
              $scope.finalB = winner;
            } else if (param === 'B') {
              $scope.finalwinner = winner;
            }
            resolve(response);
          });
          request.error(function(err) {
            // failed
            console.log("error: ", err);
            reject(err);
          });
        }, 10000);
      });
  };

});

app.controller('headtoheadController', function($scope, $http) {
  var player1name = '';
  var player2name = '';
  $scope.gender = '';


  $scope.getPlayerH2H = function() {
    $scope.ifH2HSubmitted = true;
    playerone_name = $scope.playerone;
    playertwo_name = $scope.playertwo;
    playerone_arr = playerone_name.split(" ");
    playertwo_arr = playertwo_name.split(" ");

    if ( playerone_arr.length == 2 && playertwo_arr.length == 2) {
      playerone_first = playerone_name.split(" ")[0];
      playerone_first = playerone_first.charAt(0).toUpperCase()+playerone_first.substring(1).toLowerCase();

      playerone_last = playerone_name.split(" ")[1];
      playerone_last = playerone_last.charAt(0).toUpperCase()+playerone_last.substring(1).toLowerCase();

      playertwo_first = playertwo_name.split(" ")[0];
      playertwo_first = playertwo_first.charAt(0).toUpperCase()+playertwo_first.substring(1).toLowerCase();

      playertwo_last = playertwo_name.split(" ")[1];
      playertwo_last = playertwo_last.charAt(0).toUpperCase()+playertwo_last.substring(1).toLowerCase();

      player1name = playerone_first+'_'+playerone_last;
      player2name = playertwo_first+'_'+playertwo_last;

    var request = $http({
      url: 'http://your-api-endpoint/h2h/' + player1name + '/' + player2name,
      method: "GET",
    });
    request.success(function(response) {
      $scope.playeronename = response.p1.fullName;
      $scope.DOBone = response.p1.DOB;
      $scope.DOBoneyear = $scope.DOBone.substring(0, 4);
      $scope.DOBonemonth = $scope.DOBone.substring(4, 6)
      $scope.DOBoneday = $scope.DOBone.substring(6, 8);
      $scope.NumOfTitlesone = response.p1.NumOfTitles;
      $scope.YearTurnedProone = response.p1.YearTurnedPro;
      $scope.DominantHandone = response.p1.DominantHand;
      $scope.Genderone = response.p1.Gender;
      $scope.latestRankone = response.p1.latestRank;
      $scope.gender = $scope.Genderone;
      console.log($scope.Genderone);

      $scope.playertwoname = response.p2.fullName;
      $scope.DOBtwo = response.p2.DOB;
      $scope.DOBtwoyear = $scope.DOBtwo.substring(0, 4);
      $scope.DOBtwomonth = $scope.DOBtwo.substring(4, 6)
      $scope.DOBtwoday = $scope.DOBtwo.substring(6, 8);
      $scope.NumOfTitlestwo = response.p2.NumOfTitles;
      $scope.YearTurnedProtwo = response.p2.YearTurnedPro;
      $scope.DominantHandtwo = response.p2.DominantHand;
      $scope.Gendertwo = response.p2.Gender;
      $scope.latestRanktwo = response.p2.latestRank;

      $scope.latestMatchesVs = response.latestMatches;
      $scope.getPlayerH2HWinner();
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
  } else {
      var validation_err = document.getElementById("badInput");
      validation_err.style.display = "block";
  }
  
};

  $scope.getPlayerH2HWinner = function() {
    var request = $http({
      url: 'http://your-api-endpoint/versus/'+ player1name +'/'+ player2name +'?surface='+ $scope.selectedCourtType + '&gender=' + $scope.gender + '&round=' + $scope.roundInput,
      method: "GET",
    });
    request.success(function(response) {
      $scope.predWinner = response.winner;
    });
    request.error(function(err) {
      console.log("error: ", err);
    });

  };
});


app.controller('twitterController', function($scope, $http) {

  $scope.getPossiblePlayers = function() {
    //console.log("INSIDE GETPOSTER: ", 'http://www.omdbapi.com/?apikey=952e2765&i=' + $scope.randomMovies[i].imdb_id);
    
    //var tempId = $scope.randomMovies[i].imdb_id;

    var request = $http({
      url: 'http://your-api-endpoint/twitter/players', //tt3896198',
      method: "GET",
    })

    request.success(function(response) {
      // success
      $scope.availableTwitterPlayers = [];
      console.log("INSIDE GETPOSSIBLEPLAYERS: ", response);
      console.log(response.length);
      for (i =0; i< response.length; i++) {
        console.log("INSIDE GETPOSSIBLEPLAYERS2: ", response[i].name);
        $scope.availableTwitterPlayers.push(response[i].name);
      }
      console.log($scope.availableTwitterPlayers);

    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
  }
  $scope.getPossiblePlayers();


  $scope.playery = [];

  $scope.getOneSentiment = function(playername, tempyear, tempmonth) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
          var request = $http({
            url: 'http://localhost:8084/twitter/'+ playername + '/' + tempyear + '/' + tempmonth,
            method: "GET",
          });
          request.success(function(response) {
            console.log(response);
            //return(response);
            $scope.playery.push(response);
            resolve(response);
            console.log("THIS IS MY GET SENTIMENTS RESPONSE: " + response);
          });
          request.error(function(err) {
            console.log("error: ", err);
            $scope.playery.push(0);
            resolve(err);
          });
        }, 5000);
      });
  };


  $scope.getSentiments = function() {

    //$scope.playerone
    //$scope.playertwo
    var x = document.getElementById("loader");
    var x1 = document.getElementById("loaderwrapper")
    var graph = document.getElementById("twittergraph");
    if (x.style.display === "none") {
      x.style.display = "block";
      x1.style.display = "block";
      graph.style.display = "none";
    } else {
      x.style.display = "none";
      x1.style.display = "none";
      graph.style.display = "block";
    }

    console.log("IN GET SENTIMENTS");
    var playerx = [];
    $scope.ifTwitterSubmitted = true;
    //need a for loop for the dates
    $scope.savestartyear = $scope.startyear;
    $scope.tempyear = parseInt($scope.startyear);
    $scope.startyear = "";
    $scope.savestartmonth = $scope.startmonth;
    $scope.tempmonth = parseInt($scope.startmonth);
    $scope.startmonth = "";

    $scope.saveendyear = $scope.endyear;
    $scope.endyear = "";
    $scope.saveendmonth = $scope.endmonth;
    $scope.endmonth = "";

    $scope.saveplayername = $scope.playername;
    $scope.playername = ""

    var numpoints = 0;

    console.log($scope.tempyear);
    console.log($scope.tempmonth);
    
    $scope.playery = [];

    var responses = [];
    var completed_requests = 0;
    var total_num_requests = 0;

    var tempmontharrs = [];
    var tempyearsarrs = [];

    var playername = $scope.saveplayername;

    while ($scope.tempyear < parseInt($scope.saveendyear) || ($scope.tempyear == parseInt($scope.saveendyear) && $scope.tempmonth <= parseInt($scope.saveendmonth))) {
      total_num_requests = total_num_requests+1;
      tempmontharrs.push($scope.tempmonth);
      tempyearsarrs.push($scope.tempyear);
      playerx.push($scope.tempmonth+"/"+$scope.tempyear);
      if ($scope.tempmonth == 12) {
        $scope.tempmonth = 1;
        $scope.tempyear = $scope.tempyear + 1;
      } else {
        $scope.tempmonth = $scope.tempmonth + 1;
      }
    }
    $scope.tempyear = $scope.savestartyear;
    $scope.tempmonth = $scope.savestartmonth;

    var request = $http({
      url: 'http://localhost:8084/twitter/'+ playername + '/' + tempyearsarrs[0] + '/' + tempmontharrs[0],
      method: "GET",
    });
    request.success(function(response) {
      console.log(response);
      $scope.playery.push(response);
      console.log("THIS IS MY GET SENTIMENTS RESPONSE: " + response);

      if (total_num_requests > 1) {
        var request = $http({
        url: 'http://localhost:8084/twitter/'+ playername + '/' + tempyearsarrs[1] + '/' + tempmontharrs[1],
        method: "GET",
      });
      request.success(function(response) {
        console.log(response);
        $scope.playery.push(response);
        console.log("THIS IS MY GET SENTIMENTS RESPONSE: " + response);

        if (total_num_requests > 2) {
          var request = $http({
          url: 'http://localhost:8084/twitter/'+ playername + '/' + tempyearsarrs[2] + '/' + tempmontharrs[2],
          method: "GET",
        });
        request.success(function(response) {
          console.log(response);
          $scope.playery.push(response);
          console.log("THIS IS MY GET SENTIMENTS RESPONSE: " + response);

          if (total_num_requests > 3) {
            var request = $http({
              url: 'http://localhost:8084/twitter/'+ playername + '/' + tempyearsarrs[3] + '/' + tempmontharrs[3],
              method: "GET",
            });
            request.success(function(response) {
              console.log(response);
              $scope.playery.push(response);
              console.log("THIS IS MY GET SENTIMENTS RESPONSE: " + response);

              if (total_num_requests > 4) {
                var request = $http({
                  url: 'http://localhost:8084/twitter/'+ playername + '/' + tempyearsarrs[4] + '/' + tempmontharrs[4],
                  method: "GET",
                });
                request.success(function(response) {
                  console.log(response);
                  $scope.playery.push(response);
                  console.log("THIS IS MY GET SENTIMENTS RESPONSE: " + response);

                  if (total_num_requests > 5) {
                    var request = $http({
                      url: 'http://localhost:8084/twitter/'+ playername + '/' + tempyearsarrs[5] + '/' + tempmontharrs[5],
                      method: "GET",
                    });
                    request.success(function(response) {
                      console.log(response);
                      $scope.playery.push(response);
                      console.log("THIS IS MY GET SENTIMENTS RESPONSE: " + response);

                      if (total_num_requests > 6) {
                        var request = $http({
                          url: 'http://localhost:8084/twitter/'+ playername + '/' + tempyearsarrs[6] + '/' + tempmontharrs[6],
                          method: "GET",
                        });
                        request.success(function(response) {
                          console.log(response);
                          $scope.playery.push(response);
                          console.log("THIS IS MY GET SENTIMENTS RESPONSE: " + response);

                          if (total_num_requests > 7) {

                            var request = $http({
                              url: 'http://localhost:8084/twitter/'+ playername + '/' + tempyearsarrs[7] + '/' + tempmontharrs[7],
                              method: "GET",
                            });
                            request.success(function(response) {
                              console.log(response);
                              $scope.playery.push(response);
                              console.log("THIS IS MY GET SENTIMENTS RESPONSE: " + response);

                              if (total_num_requests > 8) {

                                var request = $http({
                                  url: 'http://localhost:8084/twitter/'+ playername + '/' + tempyearsarrs[8] + '/' + tempmontharrs[8],
                                  method: "GET",
                                });
                                request.success(function(response) {
                                  console.log(response);
                                  $scope.playery.push(response);
                                  console.log("THIS IS MY GET SENTIMENTS RESPONSE: " + response);

                                  if (total_num_requests > 9) {
                                    var request = $http({
                                      url: 'http://localhost:8084/twitter/'+ playername + '/' + tempyearsarrs[9] + '/' + tempmontharrs[9],
                                      method: "GET",
                                    });
                                    request.success(function(response) {
                                      console.log(response);
                                      $scope.playery.push(response);
                                      console.log("THIS IS MY GET SENTIMENTS RESPONSE: " + response);

                                      if (total_num_requests > 10) {

                                        var request = $http({
                                          url: 'http://localhost:8084/twitter/'+ playername + '/' + tempyearsarrs[10] + '/' + tempmontharrs[10],
                                          method: "GET",
                                        });
                                        request.success(function(response) {
                                          console.log(response);
                                          $scope.playery.push(response);
                                          console.log("THIS IS MY GET SENTIMENTS RESPONSE: " + response);

                                          if (total_num_requests > 11) {

                                            var request = $http({
                                              url: 'http://localhost:8084/twitter/'+ playername + '/' + tempyearsarrs[11] + '/' + tempmontharrs[11],
                                              method: "GET",
                                            });
                                            request.success(function(response) {
                                              console.log(response);
                                              $scope.playery.push(response);
                                              console.log("THIS IS MY GET SENTIMENTS RESPONSE: " + response);


                                              var trace = {
                                                x: playerx,
                                                y: $scope.playery,
                                                mode: 'lines+markers'
                                              };
                                              var data = [trace];
                                              var layout = {};
                                              if (x.style.display === "none") {
                                                x.style.display = "block";
                                                x1.style.display = "block";
                                                graph.style.display = "none";
                                              } else {
                                                x.style.display = "none";
                                                x1.style.display = "none";
                                                graph.style.display = "block";
                                              }
                                              Plotly.newPlot('plotlydiv', data, layout, {showSendToCloud: true});


                                            });
                                            request.error(function(err) {
                                              console.log("error: ", err);
                                              $scope.playery.push(0);
                                              resolve(err);
                                            });

                                          } else {
                                            var trace = {
                                              x: playerx,
                                              y: $scope.playery,
                                              mode: 'lines+markers'
                                            };
                                            var data = [trace];
                                            var layout = {};
                                            if (x.style.display === "none") {
                                              x.style.display = "block";
                                              x1.style.display = "block";
                                              graph.style.display = "none";
                                            } else {
                                              x.style.display = "none";
                                              x1.style.display = "none";
                                              graph.style.display = "block";
                                            }
                                            Plotly.newPlot('plotlydiv', data, layout, {showSendToCloud: true});
                                          }

                                        });
                                        request.error(function(err) {
                                          console.log("error: ", err);
                                          $scope.playery.push(0);
                                          resolve(err);
                                        });

                                      } else {
                                        var trace = {
                                          x: playerx,
                                          y: $scope.playery,
                                          mode: 'lines+markers'
                                        };
                                        var data = [trace];
                                        var layout = {};
                                        if (x.style.display === "none") {
                                          x.style.display = "block";
                                          x1.style.display = "block";
                                          graph.style.display = "none";
                                        } else {
                                          x.style.display = "none";
                                          x1.style.display = "none";
                                          graph.style.display = "block";
                                        }
                                        Plotly.newPlot('plotlydiv', data, layout, {showSendToCloud: true});
                                      }

                                    });
                                    request.error(function(err) {
                                      console.log("error: ", err);
                                      $scope.playery.push(0);
                                      resolve(err);
                                    });

                                  } else {
                                    var trace = {
                                      x: playerx,
                                      y: $scope.playery,
                                      mode: 'lines+markers'
                                    };
                                    var data = [trace];
                                    var layout = {};
                                    if (x.style.display === "none") {
                                      x.style.display = "block";
                                      x1.style.display = "block";
                                      graph.style.display = "none";
                                    } else {
                                      x.style.display = "none";
                                      x1.style.display = "none";
                                      graph.style.display = "block";
                                    }
                                    Plotly.newPlot('plotlydiv', data, layout, {showSendToCloud: true});
                                  }

                                });
                                request.error(function(err) {
                                  console.log("error: ", err);
                                  $scope.playery.push(0);
                                  resolve(err);
                                });

                              } else {
                                var trace = {
                                  x: playerx,
                                  y: $scope.playery,
                                  mode: 'lines+markers'
                                };
                                var data = [trace];
                                var layout = {};
                                if (x.style.display === "none") {
                                  x.style.display = "block";
                                  x1.style.display = "block";
                                  graph.style.display = "none";
                                } else {
                                  x.style.display = "none";
                                  x1.style.display = "none";
                                  graph.style.display = "block";
                                }
                                Plotly.newPlot('plotlydiv', data, layout, {showSendToCloud: true});
                              }

                            });
                            request.error(function(err) {
                              console.log("error: ", err);
                              $scope.playery.push(0);
                              resolve(err);
                            });

                          } else {
                            var trace = {
                              x: playerx,
                              y: $scope.playery,
                              mode: 'lines+markers'
                            };
                            var data = [trace];
                            var layout = {};
                            if (x.style.display === "none") {
                              x.style.display = "block";
                              x1.style.display = "block";
                              graph.style.display = "none";
                            } else {
                              x.style.display = "none";
                              x1.style.display = "none";
                              graph.style.display = "block";
                            }
                            Plotly.newPlot('plotlydiv', data, layout, {showSendToCloud: true});
                          }

                        });
                        request.error(function(err) {
                          console.log("error: ", err);
                          $scope.playery.push(0);
                          resolve(err);
                        });
                      } else {
                        var trace = {
                          x: playerx,
                          y: $scope.playery,
                          mode: 'lines+markers'
                        };
                        var data = [trace];
                        var layout = {};
                        if (x.style.display === "none") {
                          x.style.display = "block";
                          x1.style.display = "block";
                          graph.style.display = "none";
                        } else {
                          x.style.display = "none";
                          x1.style.display = "none";
                          graph.style.display = "block";
                        }
                        Plotly.newPlot('plotlydiv', data, layout, {showSendToCloud: true});
                      }

                    });
                    request.error(function(err) {
                      console.log("error: ", err);
                      $scope.playery.push(0);
                      resolve(err);
                    });
                  } else {
                    var trace = {
                      x: playerx,
                      y: $scope.playery,
                      mode: 'lines+markers'
                    };
                    var data = [trace];
                    var layout = {};
                    if (x.style.display === "none") {
                      x.style.display = "block";
                      x1.style.display = "block";
                      graph.style.display = "none";
                    } else {
                      x.style.display = "none";
                      x1.style.display = "none";
                      graph.style.display = "block";
                    }
                    Plotly.newPlot('plotlydiv', data, layout, {showSendToCloud: true});
                  }

                });
                request.error(function(err) {
                  console.log("error: ", err);
                  $scope.playery.push(0);
                  resolve(err);
                });
              } else {
                console.log("IN total_num_requests > 4 ELSE BLOCK");
                console.log(playerx);
                console.log($scope.playery);
                var trace = {
                  x: playerx,
                  y: $scope.playery,
                  mode: 'lines+markers'
                };
                var data = [trace];
                var layout = {};
                if (x.style.display === "none") {
                  x.style.display = "block";
                  x1.style.display = "block";
                  graph.style.display = "none";
                } else {
                  x.style.display = "none";
                  x1.style.display = "none";
                  graph.style.display = "block";
                }
                Plotly.newPlot('plotlydiv', data, layout, {showSendToCloud: true});
              }

            });
            request.error(function(err) {
              console.log("error: ", err);
              $scope.playery.push(0);
              resolve(err);
            });
          } else {
            var trace = {
              x: playerx,
              y: $scope.playery,
              mode: 'lines+markers'
            };
            var data = [trace];
            var layout = {};
            if (x.style.display === "none") {
              x.style.display = "block";
              x1.style.display = "block";
              graph.style.display = "none";
            } else {
              x.style.display = "none";
              x1.style.display = "none";
              graph.style.display = "block";
            }
            Plotly.newPlot('plotlydiv', data, layout, {showSendToCloud: true});
          }

        });
        request.error(function(err) {
          console.log("error: ", err);
          $scope.playery.push(0);
          resolve(err);
        });
        } else {
          var trace = {
            x: playerx,
            y: $scope.playery,
            mode: 'lines+markers'
          };
          var data = [trace];
          var layout = {};
          if (x.style.display === "none") {
            x.style.display = "block";
            x1.style.display = "block";
            graph.style.display = "none";
          } else {
            x.style.display = "none";
            x1.style.display = "none";
            graph.style.display = "block";
          }
          Plotly.newPlot('plotlydiv', data, layout, {showSendToCloud: true});
        }

      });
      request.error(function(err) {
        console.log("error: ", err);
        $scope.playery.push(0);
        resolve(err);
      });
      } else {
        var trace = {
          x: playerx,
          y: $scope.playery,
          mode: 'lines+markers'
        };
        var data = [trace];
        var layout = {};
        if (x.style.display === "none") {
          x.style.display = "block";
          x1.style.display = "block";
          graph.style.display = "none";
        } else {
          x.style.display = "none";
          x1.style.display = "none";
          graph.style.display = "block";
        }
        Plotly.newPlot('plotlydiv', data, layout, {showSendToCloud: true});
      }

    });
    request.error(function(err) {
      console.log("error: ", err);
      $scope.playery.push(0);
      resolve(err);
    });










  };


  $scope.getSentiments2 = function() {

    //$scope.playerone
    //$scope.playertwo
    var x = document.getElementById("loader");
    var x1 = document.getElementById("loaderwrapper")
    var graph = document.getElementById("twittergraph");
    if (x.style.display === "none") {
      x.style.display = "block";
      x1.style.display = "block";
      graph.style.display = "none";
    } else {
      x.style.display = "none";
      x1.style.display = "none";
      graph.style.display = "block";
    }

    console.log("IN GET SENTIMENTS");
    var playerx = [];
    $scope.ifTwitterSubmitted = true;
    //need a for loop for the dates
    $scope.savestartyear = $scope.startyear;
    $scope.tempyear = parseInt($scope.startyear);
    $scope.startyear = "";
    $scope.savestartmonth = $scope.startmonth;
    $scope.tempmonth = parseInt($scope.startmonth);
    $scope.startmonth = "";

    $scope.saveendyear = $scope.endyear;
    $scope.endyear = "";
    $scope.saveendmonth = $scope.endmonth;
    $scope.endmonth = "";

    $scope.saveplayername = $scope.playername;
    $scope.playername = ""

    var numpoints = 0;

    console.log($scope.tempyear);
    console.log($scope.tempmonth);
    
    var promisearray = [];
    $scope.playery = [];

    while ($scope.tempyear < parseInt($scope.saveendyear) || ($scope.tempyear == parseInt($scope.saveendyear) && $scope.tempmonth <= parseInt($scope.saveendmonth))) {
      playerx.push($scope.tempmonth + "/" + $scope.tempyear);
      console.log("IN GETSENTIMENTS WHILE LOOP");
      console.log("TEMPYEAR: " + $scope.tempyear);
      console.log("TEMPMONTH: " + $scope.tempmonth);

      promisearray.push($scope.getOneSentiment($scope.saveplayername, $scope.tempyear, $scope.tempmonth));

      if ($scope.tempmonth == 12) {
        $scope.tempmonth = 1;
        $scope.tempyear = $scope.tempyear + 1;
      } else {
        $scope.tempmonth = $scope.tempmonth + 1;
      }
    }

    Promise.all(promisearray)
      .then(() => {
        console.log("IN PROMISEALL THEN FUNC");
        console.log("PLAYERX: " + playerx);
        console.log("PLAYERY: " + $scope.playery);
        var trace = {
          x: playerx,
          y: $scope.playery,
          mode: 'lines+markers'
        };
        var data = [trace];
        var layout = {};
        if (x.style.display === "none") {
          x.style.display = "block";
          x1.style.display = "block";
          graph.style.display = "none";
        } else {
          x.style.display = "none";
          x1.style.display = "none";
          graph.style.display = "block";
        }
        Plotly.newPlot('plotlydiv', data, layout, {showSendToCloud: true});
      });
    
    console.log("AFTER THE PROMISE");

  };

});

// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {

  };
});
*/
