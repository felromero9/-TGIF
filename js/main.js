





// ******  vue *************

$(function () {
  //start Vue
     var app = new Vue({
        el: '#app',
        data: {
            data: [],
            members: [],
            states:[]
        }
    
    
    })

    fetchJson("https://api.propublica.org/congress/v1/113/senate/members.json", {
        method: 'GET',
        headers: new Headers({
            "X-API-Key": "7Qvm6evYqEhjb7zMdnciljoUUtEUeD2O8hvEuq1E"
        })
    })

    .then(function (json) {
        // here i have to put the Vue,
        app.members=json.results[0].members;
        app.data= app.members;
        app.states=Array.from(states(json.results[0].members)).sort();
      
    }).catch(function (error) {
        console.log("error");
    });

    // verify that json is ok!
    function fetchJson(url, init) {
        return fetch(url, init).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        });
    }

    function createFilter() {
          var selectedPartysArray = [];
          if (document.getElementById("democrat").checked)
              selectedPartysArray.push("D");
          if (document.getElementById("republican").checked)
              selectedPartysArray.push("R");
          if (document.getElementById("independent").checked)
              selectedPartysArray.push("I");
    
          //filter var
          // candidateFilter, me filtra 
          app.members = app.data.filter(candidate => candidateFilter(candidate, selectedPartysArray))
    }
    $("#democrat,#republican,#independent").click(function(){
        createFilter();
    });
    $("#filterState").change(function(){
        createFilter();
    })


      // funtion definition used in Vue
    function candidateFilter(candidate, types) {
    var h = document.getElementById("filterState");
    var acepted = false;
    if (types.length <= 0 && (candidate.state == h.value || h.value == "-All-" || !h.value)) {
        acepted = true;
     } else if (types.indexOf(candidate.party) >= 0 && (candidate.state == h.value || h.value == "-All-")) {
        acepted = true;
     }
    return acepted;
    }

    function states(filterCandidates) {
    var statesList = new Set(); // show only 1 item (no repeats items)
    statesList.add("-All-");
    for (var i = 0; i < filterCandidates.length; i++) {
        statesList.add(filterCandidates[i].state);
    }
    return statesList;
    }
});
