/* Refresh page */


/* Requests AJAX*/

function loadResults(url, functionUrl) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      functionUrl(this);
    }
 }
  xhttp.open("GET", url, true);
  xhttp.send();
}

//Best film request
let bestFilmUrlList = "http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score";
let bestFilmUrl;

function bestFilmUrlFunc(result) {
  bestFilmUrl = JSON.parse(result.responseText).results[0].url;   
  loadResults(bestFilmUrl, bestFilmResultMainPage);

}

function bestFilmResultMainPage(result){
  document.getElementById("bestFilmImage").innerHTML = "<img src=" + JSON.parse(result.responseText).image_url + "alt='Best Film Image' />";
  document.getElementById("bestFilmTitle").innerHTML = JSON.parse(result.responseText).original_title;
  document.getElementById("bestFilmDescription").innerHTML = JSON.parse(result.responseText).description;
}

loadResults(bestFilmUrlList, bestFilmUrlFunc);



//Modal Results

function FilmResultsModale(result){
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

// Modal Window

let modal = document.getElementById("myModal");
let btn = document.getElementById("boutonInfo");
let span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  loadResults(bestFilmUrl, FilmResultsModale);
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

// Category Action

let actionFilmUrlList = "http://localhost:8000/api/v1/titles/?genre=Action&sort_by=-votes,-imdb_score";
let elt = document.getElementById("categoryOne");
let title = document.createElement("h1");
title.textContent = "Action";
elt.appendChild(title);

const resultsImagesUrl = [];
const resultsLinksUrl = [];
function allresultsCategoryFunc(result) {
  for (let i = 0; i < 5; i++){
    resultsImagesUrl.push(JSON.parse(result.responseText).results[i].image_url);  
    resultsLinksUrl.push(JSON.parse(result.responseText).results[i].url);  
  }
  if (resultsImagesUrl.length > 7){
    for (let i = 0; i < 7; i++) {
      const Link = document.createElement("a");
      Link.setAttribute('href', resultsLinksUrl[i]);
      elt.appendChild(Link);
      Link.innerHTML = "<img src=" + resultsImagesUrl[i] + "alt='Category Film Image' />";
    }
  } 
}
for (i = 1; i < 3; i++) {
  let url = actionFilmUrlList + "&page=" + i;
  loadResults(url, allresultsCategoryFunc);
}





