/* Refresh page */


/* Requests AJAX*/

let bestFilmUrl = '';


function loadResults(url, cFunction) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
 }
  xhttp.open("GET", url, true);
  xhttp.send();
}

function bestFilmUrlFunc(result) {
    bestFilmUrl = JSON.parse(result.responseText).results[0].url;   
    loadResults(bestFilmUrl, bestFilmResults);
}

function bestFilmResults(result){
    document.getElementById("bestFilmImage").innerHTML = "<img src=" + JSON.parse(result.responseText).image_url + "alt='Best Film Image' />";
    document.getElementById("bestFilmTitle").innerHTML = JSON.parse(result.responseText).original_title;
    document.getElementById("bestFilmDescription").innerHTML = JSON.parse(result.responseText).description;
    document.getElementById("filmImage").innerHTML = "<img src=" + JSON.parse(result.responseText).image_url + "alt='Best Film Image' />";
    document.getElementById("original_title").innerHTML = JSON.parse(result.responseText).original_title;
    document.getElementById("genres").innerHTML = JSON.parse(result.responseText).genres;
    document.getElementById("date_published").innerHTML = JSON.parse(result.responseText).date_published;
    document.getElementById("rated").innerHTML = JSON.parse(result.responseText).rated;
    document.getElementById("imdb_score").innerHTML = JSON.parse(result.responseText).imdb_score;
    document.getElementById("directors").innerHTML = JSON.parse(result.responseText).directors;
    document.getElementById("actors").innerHTML = JSON.parse(result.responseText).actors;
    document.getElementById("duration").innerHTML = JSON.parse(result.responseText).duration + ' min';
    document.getElementById("countries").innerHTML = JSON.parse(result.responseText).countries;
    document.getElementById("worldwide_gross_income").innerHTML = JSON.parse(result.responseText).worldwide_gross_income + ' entrées';
    document.getElementById("long_description").innerHTML = JSON.parse(result.responseText).long_description;
}

loadResults("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score", bestFilmUrlFunc);

// Modal

let modal = document.getElementById("myModal");
let btn = document.getElementById("boutonInfo");
let span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}





