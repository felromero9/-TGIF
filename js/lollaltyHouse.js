//var data;




$(function () {
  //start Vue
  app = new Vue({
      el: '#app',
      data: {
        senators: [],
        atendenceStadistics:{
          "numR": 0,
          "numD": 0,
          "numI": 0,
          "averageRepublic": 0,
          "averageDemocrat": 0,
          "averageIndepent": 0,
          "lollaltyTop": [],
          "lollaltyBottom": [],
          "atendanceTop": [],
          "atendanceBottom": []
        }
      }
  })
    
  fetchJson("https://api.propublica.org/congress/v1/113/house/members.json", {
    method: 'GET',
    headers: new Headers({
        "X-API-Key": "7Qvm6evYqEhjb7zMdnciljoUUtEUeD2O8hvEuq1E"
    })
  })

  .then(function (json) {
    app.senators = json.results[0].members;
    //app.vueStatdistics= atendenceStadistics;
    processAverage();
    processStadistics();
    

  }).catch(function (error) {
      console.log("FATAL ERROR");
  });

  function fetchJson(url, init) {
    return fetch(url, init).then(function (response) {
        if (response.ok) {
            return response.json();
          }
        throw new Error(response.statusText);
      });
  }
  



    function processAverage(){
      // * variables
      var republicSt = [];
      var democratSt = [];
      var independtSt = [];

      app.senators.forEach(member => {
          if (member.party == "R") {
              republicSt.push(member);
          } else if (member.party == "D") {
              democratSt.push(member);
          } else {
              independtSt.push(member)
          }
      });

      app.atendenceStadistics.numR = republicSt.length;
      app.atendenceStadistics.numD = democratSt.length;
      app.atendenceStadistics.numI = independtSt.length;

      app.atendenceStadistics.averageRepublic = calculateAverage (republicSt,app.atendenceStadistics.numR);
      app.atendenceStadistics.averageDemocrat = calculateAverage (democratSt,app.atendenceStadistics.numD);
      app.atendenceStadistics.averageIndepent = calculateAverage (independtSt,app.atendenceStadistics.numI);
    }
 //******* calculate Average
    function calculateAverage(list, totalElement) {
        var acumulador = 0;
        for (var i = 0; i < list.length; i++) {
            acumulador += list[i].votes_with_party_pct;
        }
        acumulador = acumulador / totalElement;
        return acumulador;
    }

// maps
    function sendMap(list, p, valor) {
      if (valor < 0) { // for loyalty
          return list.map(person => person.votes_with_party_pct).sort();
      } else if (valor > 0) { // for attendance
          return list.map(person => person.missed_votes_pct).sort();

      }
    } 


   // take 0.5 like parameter to know 0.1 o 0.9
   // make a filter to do that
    function people10(list, p, valor) {
      var number = tenList(list, p, valor);

      if (valor < 0 && p < 0.5) { // loyal bottom
          var listLess10 = list.filter(person => person.votes_with_party_pct <= number);
          listLess10.sort(function compareMember(m1, m2) {
              return m1.votes_with_party_pct - m2.votes_with_party_pct;
          });
          return listLess10;

      } else if (valor < 0 && p > 0.5) { //loyal top
          var listLess10 = list.filter(person => person.votes_with_party_pct >= number);
          listLess10.sort(function compareMember(m1, m2) {
          return m1.votes_with_party_pct - m2.votes_with_party_pct;
        });

          return listLess10.reverse();
        
        } else if (valor > 0 && p < 0.5) { // attendance bottom
            var listLess10 = list.filter(person => person.missed_votes_pct <= number);
            listLess10.sort(function compareMember(m1, m2) {
            return m1.missed_votes_pct - m2.missed_votes_pct;
          });

          return listLess10;

      } else if (valor > 0 && p > 0.5) { //attendance top
          var listLess10 = list.filter(person => person.missed_votes_pct >= number);
          listLess10.sort(function compareMember(m1, m2) {
          return m1.missed_votes_pct - m2.missed_votes_pct;
        });
          return listLess10.reverse();
      }
      return listLess10;
    }

   // to know the valor of the .1 o .9
    function tenList(list, p, valor) {
      var list = sendMap(list, p, valor);
      var N = list.length;
      var last = list[0];
        for (var i = 1; i <= N; i++) {
            if ((i / N) <= p) {
                last = list[i - 1];
            }
        }

      return last;
    }

    function processStadistics(){
          app.atendenceStadistics.lollaltyTop = people10(app.senators, p = 0.9, valor = -1);
          app.atendenceStadistics.lollaltyBottom = people10(app.senators, p = 0.1, valor = -1);
          app.atendenceStadistics.atendanceTop=people10 (app.senators, p = 0.9, valor = 1);
          app.atendenceStadistics.atendanceBottom= people10(app.senators, p = 0.1, valor = 1);

    }

})





