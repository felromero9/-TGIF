//var data;

$(function () {
  //start Vue
  var app = new Vue({
    el: '#app',
    data: {
      members: [],
      vueStatdistics:[] // stadistics globals
      
    }
  })
  
  
  fetchJson("https://api.propublica.org/congress/v1/113/senate/members.json", {
    method: 'GET',
    headers: new Headers({
        "X-API-Key": "7Qvm6evYqEhjb7zMdnciljoUUtEUeD2O8hvEuq1E"
    })
  })
  .then(function (json) {
    data = json.results[0].members;
    app.members = data
    app.vueStatdistics= atendenceStadistics;
    

    test1();
    //app.members=json.results[0].members;
    //app.data= app.members;
    //app.states=Array.from(states(json.results[0].members)).sort();
    console.log (data);

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

  var atendenceStadistics = {
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
    // * variables
    var republicSt = [];
    var democratSt = [];
    var independtSt = [];


   // function with the calls
   function test1 () {

      var membersTab = data.map(member => membersLol(member));

        atendenceStadistics.numR = republicSt.length;
        atendenceStadistics.numD = democratSt.length;
        atendenceStadistics.numI = independtSt.length;

        console.log(atendenceStadistics.numR)
        console.log(atendenceStadistics.numD)
        console.log(atendenceStadistics.numI)
        // send to Json the valor of the function calculateAverage
        atendenceStadistics.averageRepublic = calculateAverage(republicSt, atendenceStadistics.numR);
        atendenceStadistics.averageDemocrat = calculateAverage(democratSt, atendenceStadistics.numD);
        atendenceStadistics.averageIndepent = calculateAverage(independtSt, atendenceStadistics.numI);
        console.log('republi average :' + calculateAverage(republicSt, atendenceStadistics.numR));
        console.log('democrat average : ' + calculateAverage(democratSt, atendenceStadistics.numD));
        console.log('independ average : ' + calculateAverage(independtSt, atendenceStadistics.numI));

        console.log(getJson(atendenceStadistics));
        //document.getElementById("tableVotesTotal").innerHTML = getJson(atendenceStadistics);

        atendenceStadistics.lollaltyTop = JSON.parse("[" + people10(data, p = 0.9, valor = -1).substring(0, people10(data, p = 0.9, valor = -1).length - 1) + "]");
        console.log(atendenceStadistics.lollaltyTop);
 
        atendenceStadistics.lollaltyBottom = JSON.parse("[" + people10(data, p = 0.1, valor = -1).substring(0, people10(data, p = 0.1, valor = -1).length - 1) + "]");
        console.log(atendenceStadistics.lollaltyBottom);

        atendenceStadistics.atendanceTop = JSON.parse("[" + people10(data, p = 0.9, valor = 1).substring(0, people10(data, p = 0.9, valor = 1).length - 1) + "]");
        console.log(atendenceStadistics.atendanceTop);

        atendenceStadistics.atendanceBottom = JSON.parse("[" + people10(data, p = 0.1, valor = 1).substring(0, people10(data, p = 0.1, valor = 1).length - 1) + "]");
        console.log(atendenceStadistics.atendanceBottom);

            // innerHTML table

        // table Loyal Bottom id=lollaltyButtum  house
      /*if (document.getElementById("lollaltyButtum")) {
          document.getElementById("lollaltyButtum").innerHTML = atendenceStadistics.lollaltyBottom.map(person => tableLoyalBotton(person)).join("");
      }

      // table loyal top id=tableLoyalTop
      if (document.getElementById("lollaltyTop")) {
          document.getElementById("lollaltyTop").innerHTML = atendenceStadistics.lollaltyTop.map(person => tableLoyalTop(person)).join("");
      }


      // table Atendence bottom  

      if (document.getElementById("attendanceButtom")) {
          document.getElementById("attendanceButtom").innerHTML = atendenceStadistics.atendanceBottom.map(person => tableAtendenceBotton(person)).join("");
      }

      // table Atendence top
      if (document.getElementById("attendanceTop")) {
          document.getElementById("attendanceTop").innerHTML = atendenceStadistics.atendanceTop.map(person => tableAtendenceTop(person)).join("");
      }*/


  }

 
   //var membersTab = data.map(member => membersLol(member));

   function membersLol(member) {
    if (member.party == "R") {
        republicSt.push(member);
    } else if (member.party == "D") {
        democratSt.push(member);
    } else {
        independtSt.push(member)
    }
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

   //***** show in html and json
   
   /*function getJson(atendenceStadistics) {
       return "<tr><td>" + "" + "Republican " + "<td>" + atendenceStadistics.numR + "</td>" + "<td>" + atendenceStadistics.averageRepublic + " %" +
           "<tr><td>" + "Democrat" + "<td>" + atendenceStadistics.numD + "</td>" + "<td>" + atendenceStadistics.averageDemocrat + " %" + "</td>" +
           "<tr><td>" + "Independent" + "<td>" + atendenceStadistics.numI + "<td>" + atendenceStadistics.averageIndepent + " %" + "</td>" + "</td></tr>";

   }*/
   // maps
   function sendMap(list, p, valor) {
       if (valor < 0) { // for loyalty
           return list.map(person => person.votes_with_party_pct).sort();
       } else if (valor > 0) { // for attendance
           return list.map(person => person.missed_votes_pct).sort();

       }
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


   // take 0.5 like parameter to know 0.1 o 0.9
   // make a filter to do that
   function people10(list, p, valor) {
       var number = tenList(list, p, valor);

       if (valor < 0 && p < 0.5) { // loyal bottom
           var listLess10 = list.filter(person => person.votes_with_party_pct <= number);
           listLess10.sort(function compareMember(m1, m2) {
               return m1.votes_with_party_pct - m2.votes_with_party_pct;
           });
           return listLess10.map(person => peopleTable(person)).join("");

       } else if (valor < 0 && p > 0.5) { //loyal top
           var listLess10 = list.filter(person => person.votes_with_party_pct >= number);
           listLess10.sort(function compareMember(m1, m2) {
               return m1.votes_with_party_pct - m2.votes_with_party_pct;
           });

           return listLess10.map(person => peopleTable(person)).reverse().join("");
       } else if (valor > 0 && p < 0.5) { // attendance bottom
           var listLess10 = list.filter(person => person.missed_votes_pct <= number);
           listLess10.sort(function compareMember(m1, m2) {
            return m1.missed_votes_pct - m2.missed_votes_pct;
           });

           return listLess10.map(person => peopleTable(person)).join("");

       } else if (valor > 0 && p > 0.5) { //attendance top
           var listLess10 = list.filter(person => person.missed_votes_pct >= number);
           listLess10.sort(function compareMember(m1, m2) {

               return m1.missed_votes_pct - m2.missed_votes_pct;

           });
           return listLess10.map(person => peopleTable(person)).reverse().join("");

       }
       return listLess10.map(person => peopleTable(person)).reverse().join("");
   }



   //create jason with the last funtion
   // put into the table

   function peopleTable(person) {
       if (valor < 0) { //votes with party pct

           return '{"fullName":' + ' "' + person.last_name + ', ' + person.first_name + ' ' + (person.middle_name == null ? "" : person.middle_name) + '" ' + ',' +
               '"votesTotal":' + person.total_votes + ', ' + '"votesPct": ' + person.votes_with_party_pct + '},'

       } else if (valor > 0) { //missed votes
           return '{"fullName":' + ' "' + person.last_name + ', ' + person.first_name + ' ' + (person.middle_name == null ? "" : person.middle_name) + '" ' + ',' +
               '"votesMissedTotal":' + person.missed_votes + ', ' + '"votesMissedPct": ' + person.missed_votes_pct + '},'
       }
   }




   // remplace Json 

/*
   atendenceStadistics.lollaltyTop = JSON.parse("[" + people10(data, p = 0.9, valor = -1).substring(0, people10(data, p = 0.9, valor = -1).length - 1) + "]");
   console.log(atendenceStadistics.lollaltyTop);


   atendenceStadistics.lollaltyBottom = JSON.parse("[" + people10(data, p = 0.1, valor = -1).substring(0, people10(data, p = 0.1, valor = -1).length - 1) + "]");
   console.log(atendenceStadistics.lollaltyBottom);


   atendenceStadistics.atendanceTop = JSON.parse("[" + people10(data, p = 0.9, valor = 1).substring(0, people10(data, p = 0.9, valor = 1).length - 1) + "]");
   console.log(atendenceStadistics.atendanceTop);

   atendenceStadistics.atendanceBottom = JSON.parse("[" + people10(data, p = 0.1, valor = 1).substring(0, people10(data, p = 0.1, valor = 1).length - 1) + "]");
   console.log(atendenceStadistics.atendanceBottom);
*/






   // create function to the tables

   function tableLoyalBotton(person) {
       return "<tr><td>" + person.fullName + ", " + " " + "</td><td>" + person.votesTotal + "</td><td>" + " " + person.votesPct + "  %" + "</td></tr>";
   }

   function tableLoyalTop(person) {
       return "<tr><td>" + person.fullName + ", " + " " + "</td><td>" + person.votesTotal + "</td><td>" + " " + person.votesPct + "  %" + "</td></tr>";
   }


   function tableAtendenceBotton(person) {
       return "<tr><td>" + person.fullName + ", " + " " + "</td><td>" + person.votesMissedTotal + "</td><td>" + " " + person.votesMissedPct + "  %" + "</td></tr>";
   }

   function tableAtendenceTop(person) {
       return "<tr><td>" + person.fullName + ", " + " " + "</td><td>" + person.votesMissedTotal + "</td><td>" + " " + person.votesMissedPct + "  %" + "</td></tr>";
   }



/*
   // innerHTML table

   // table Loyal Bottom id=lollaltyButtum  house
   if (document.getElementById("lollaltyButtum")) {
       document.getElementById("lollaltyButtum").innerHTML = atendenceStadistics.lollaltyBottom.map(person => tableLoyalBotton(person)).join("");
   }

   // table loyal top id=tableLoyalTop
   if (document.getElementById("lollaltyTop")) {
       document.getElementById("lollaltyTop").innerHTML = atendenceStadistics.lollaltyTop.map(person => tableLoyalTop(person)).join("");
   }


   // table Atendence bottom  

   if (document.getElementById("attendanceButtom")) {
       document.getElementById("attendanceButtom").innerHTML = atendenceStadistics.atendanceBottom.map(person => tableAtendenceBotton(person)).join("");
   }

   // table Atendence top
   if (document.getElementById("attendanceTop")) {
       document.getElementById("attendanceTop").innerHTML = atendenceStadistics.atendanceTop.map(person => tableAtendenceTop(person)).join("");
   }*/

   //********************************************************************************************************************************************************






  })