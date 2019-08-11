a/*document.getElementById("house").innerHTML = JSON.stringify(data.results[0].members, null, 2);*/




function getColumnsHtml(data) {
    return data.results[0].members.map(function (member) {
        return "<tr><td>" + "<a href=" + member.url+">" + member.last_name  + ", " + member.first_name + " " + (member.middle_name == null ? "" : member.middle_name)+"</a>" +
            "<td>" + member.party + "</td>" +
            "<td>" + member.state + "</td>" +
            "<td>" + member.seniority + "</td>"+
        "<td>" + member.votes_with_party_pct + "%"+  "</td>";
        "</tr>"

    }).join("")

}
console.log(getColumnsHtml(data));

document.getElementById("table-rows").innerHTML = getColumnsHtml(data);





<
/* function makingRow(member) {
     var row = "<tr>";
     row += "<td>" + member.last_name + "," + member.first_name + " " + (member.middle_name == null ? "" : member.middle_name) + "</td>";
     row += "<td>" + member.party + "</td>";
     row += "<td>" + member.state + "</td>";
     row += "<td>" + member.seniority "</td>";
     row += "<td>" + member.votes_with_party_pct + "%"+ "</td>";
     row += "</tr>";
     return row

 }

 function makingTable() {
     var members = data.results[0].members;
     var bodyTable = "";
     for (i = 0; i < members.length; i++) {
         bodyTable += makingRow(members[i]);
     }
     document.getElementById("tableRows").innerHTML = bodyTable
 }*/


/*function buildRow(member) {
 var row = "<tr>";
 row += "<td>" + member.last_name + ", " + member.first_name + " " + (member.middle_name == null ? "" : member.middle_name) + "</td>";
 row += "<td>" + member.party + "</td>";
 row += "<td>" + member.state + "</td>";
 row += "<td>" + member.seniority + "</td>";
 row += "<td>" + member.votes_with_party_pct + "%" + "</td>" ;
 row += "</tr>";
 return row
}

function buildTableBody() {
 var members = data.results[0].members;
 var bodyTable = "";
 for(i = 0; i < members.length; i++) {
   bodyTable += buildRow(members[i]);
 }
 document.getElementById("table-rows").innerHTML = bodyTable
}*/
    
    //// **********************************************************************************************
    
    //************** 10% of Senators who vote least often with their party.*******************************************************

// sort the votes

function sortVotes (list){
    return list.map(person => person.votes_with_party_pct).sort();
    
}
console.log('sort votes '+ sortVotes(data.results[0].members));


function leastTen (list){
    var list = sortVotes (list);
    var listLeng= list.length;
    var porcen = 0.1;
    var last = list[0];
    for (var i=1; i <= listLeng; i++){
        if ((i/listLeng) <= porcen ){
            last = list [i-1];
            
        }
    }
    return last;
    
}
// show me the last number of the 10%
console.log ('last one '+ leastTen(data.results[0].members));

// map all members 

function membersTenLeast (list){
    var number = leastTen (list);
    var listTenMenor = list.filter(person => person.votes_with_party_pct <= number);
    listTenMenor.sort (function compareMembers(m1,m2){
                       return m1.votes_with_party_pct - m2.votes_with_party_pct;
                        });
    return listTenMenor.map (person => peopleTable (person)).join("");
    
}

// put into the table
function peopleTable (person){
    return "<tr><td>" + person.last_name +", "+ person.first_name+ " "+ (person.middle_name == null ? "" : person.middle_name) + " "+"</td><td>"+ person.total_votes + "</td><td>"+" "+ person.votes_with_party_pct+"  %" +"</td></tr>";
    
}
// innerHTML table
console.log( 'List Member Ten'+ membersTenLeast(data.results[0].members) );
document.getElementById("leastTen").innerHTML = membersTenLeast(data.results[0].members);


// ******************* TOP LIST **************************************************************************
    

function topList (list){
    var list = sortVotes (list).reverse();
    var listLeng= list.length;
    var porcen = 0.1;
    var last = list[0];
    for (var i=1; i <= listLeng; i++){
        if ((i/listLeng) <= porcen ){
            last = list [i-1];
            
        }
    }
    return last;
    
}
// show me the top number of the 10%
console.log ('top one '+ topList(data.results[0].members));// top one 98.81


// maps 
function peopleTopTable (list){
    var number = topList (list);
    var listTop = list.filter(person => person.votes_with_party_pct >= number);
    listTop.sort (function compareMembers(m1,m2){
                 return m1.votes_with_party_pct - m2.votes_with_party_pct;
                        });
    return listTop.reverse().map (person => peopleTableTop (person)).join("");
    
}

// put into the table
function peopleTableTop (person){
    return "<tr><td>" + person.last_name +", "+ person.first_name+ " "+ (person.middle_name == null ? "" : person.middle_name) + " "+"</td><td>"+ person.total_votes + "</td><td>"+" "+ person.votes_with_party_pct+"  %" +"</td></tr>";
    
}
// innerHTML table
console.log( 'List Member Ten'+ peopleTopTable(data.results[0].members) );
document.getElementById("topLoyal").innerHTML = peopleTopTable(data.results[0].members);



// ****************************************************************************************************


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
