
//var data;
    function fetchJson(url, init) {
        return fetch(url, init).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
            });
        }

        mainFunction();
        function mainFunction(){
        $(function (){
        var app = new Vue({
            el: '#app',
            data: {
                senators: [],
                statesList:[],
                filtered:[],
                }
        })

        fetchJson("https://api.propublica.org/congress/v1/113/senate/members.json", {
        method: 'GET',
        headers: new Headers({
            "X-API-Key": " 7Qvm6evYqEhjb7zMdnciljoUUtEUeD2O8hvEuq1E"
            })
        })

        .then(function (json) {
            app.senators = json.results[0].members;
            app.statesList= states(app.senators);
            //app.filtered=createTable();
            createTable();

                function createTable() {
                var buttonArray = []; //Creation of an array with three buttons for party filter
                var typesArray = [];
                if (document.getElementById("republican").checked) {
                    typesArray.push("R");
                }
                if (document.getElementById("democrat").checked) {
                    typesArray.push("D");
                }
                if (document.getElementById("independent").checked) {
                    typesArray.push("I");
                }

                app.filtered = app.senators.filter(candidate => candidateFilter(candidate, typesArray))
                
                }

                //Filtrating with conditionals
                function candidateFilter(candidate, types) {
                    //var h = document.getElementById("optionsState"); // "select" options
                    //var accept = false;
                    if (types.length == 0 && (candidate.state == app.statesList.value || app.statesList.value == "-All-" || !app.statesList.value)) {
                        return true; //when no button is checked
                    } else if (types.indexOf(candidate.party) >= 0 && (candidate.state == app.statesList.value || app.statesList.value == "-All-")) {
                        return true;
                    } else{
                        return false;
                        }
                    }
                console.log( 'senator' + app.senators)
                console.log('list states' + app.statesList)
                console.log('filter' + app.filtered)

    }).catch(function (error) {
        console.log("error")
    });
    })
}

//creat dorpdown menu
//app.senators = candidatos;
function states(candidatos) {
      var statesSet = new Set();
      statesSet.add("-All-");
      for (var i = 0; i < candidatos.length; i++) {
          statesSet.add(candidatos[i].state); //list of states
      }
      //Sort and send to map in "createOptions":
    return Array.from(statesSet).sort()//.map(candidate => createOptions(candidate)).join("");
  }
