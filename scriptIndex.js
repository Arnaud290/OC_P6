
/* Requests AJAX*/
function loadResults(url, functionUrl, status) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      functionUrl(this);
    }
 }
  xhttp.open("GET", url, status);
  xhttp.send();
}

//Best film request
let bestFilmUrlList = "http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score";
let bestFilmUrl;
function bestFilmUrlFunc(result) {
  bestFilmUrl = JSON.parse(result.responseText).results[0].url;   
  loadResults(bestFilmUrl, bestFilmResultMainPage, true);
}
function bestFilmResultMainPage(result){
  document.getElementById("bestFilmImage").innerHTML = "<img src=" + JSON.parse(result.responseText).image_url + "alt='Best Film Image' height='400' width='300'/>";
  document.getElementById("bestFilmTitle").innerHTML = JSON.parse(result.responseText).original_title;
  document.getElementById("bestFilmDescription").innerHTML = JSON.parse(result.responseText).description;
}
loadResults(bestFilmUrlList, bestFilmUrlFunc, true);
let btn = document.getElementById("boutonInfo");
btn.onclick = function() {
  loadResults(bestFilmUrl, FilmResultsModale, true);
  modal.style.display = "block";
}

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
let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Categories
function Category(titleCategory){
  let genre = '';
  let idSection;
  if (titleCategory != "Film les mieux notés"){
    genre = titleCategory;
    idSection = genre;
    }else{
      genre = '';
      idSection = 'bestFilms'
    }
  let FilmUrlList = "http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&genre=" + genre;
  let section = document.createElement("section");
  
  let nav = document.createElement("a");
  nav.setAttribute("href", '#'+ idSection);
  nav.textContent = titleCategory;   
  document.getElementById("navigation").appendChild(nav);
  const slide = [];
  section.setAttribute("class", "category");
  section.setAttribute("id", idSection);
  document.getElementById("blockPage").appendChild(section);
  let p = document.createElement("p");
  p.setAttribute("class", "titleCategory");
  p.setAttribute("id", idSection + 'Title');
  section.appendChild(p);
  let h1 = document.createElement("h1");
  h1.textContent = titleCategory; 
  document.getElementById(idSection + 'Title').appendChild(h1);
  let divSlider = document.createElement("div");
  divSlider.setAttribute("id", "slider" + idSection);
  divSlider.setAttribute("id", idSection + "List");
  divSlider.setAttribute("class", "list");
  let divSlide1 = document.createElement("div");
  divSlide1.setAttribute("id", "slide1" + idSection);
  divSlide1.setAttribute("class", "slide slide1");
  let divSlide2 = document.createElement("div");
  divSlide2.setAttribute("id", "slide2" + idSection);
  divSlide2.setAttribute("class", "slide slide2");
  let divSlide3 = document.createElement("div");
  divSlide3.setAttribute("id", "slide3" + idSection);
  divSlide3.setAttribute("class", "slide slide3");
  let divSlide4 = document.createElement("div");
  divSlide4.setAttribute("id", "slide4" + idSection);
  divSlide4.setAttribute("class", "slide slide4");
  const resultsImagesUrl = [];
  const resultsLinksUrl = [];
  function allresultsCategoryFunc(result) {
    for (let i = 0; i < 5; i++) {
      resultsImagesUrl.push(JSON.parse(result.responseText).results[i].image_url);  
      resultsLinksUrl.push(JSON.parse(result.responseText).results[i].url);  
    }
    if (resultsImagesUrl.length > 7) {
      for (let i = 0; i < 7; i++) {
        slide.push("<img src=" + resultsImagesUrl[i] + "alt='Category Film Image/>");
      }
    }
    changeSlide(0);
    divSlider.appendChild(divControlNext);
  }
  let divControlPrev = document.createElement("div");
  let divControlNext = document.createElement("div");
  divControlPrev.setAttribute("id", "prev" + idSection);
  divControlPrev.setAttribute("class", "prev");
  divControlPrev.textContent = "<";
  divControlNext.setAttribute("id", "next" + idSection);
  divControlNext.setAttribute("class", "next");
  divControlNext.textContent = ">";
  divSlider.appendChild(divControlPrev);
  divSlider.appendChild(divSlide1);
  divSlider.appendChild(divSlide2);
  divSlider.appendChild(divSlide3);
  divSlider.appendChild(divSlide4);
  section.appendChild(divSlider);
  let nbSlide = 0;
  function changeSlide(direction) {
    nbSlide = nbSlide + direction;
    if (window.matchMedia("(max-width: 900px)").matches) {
      if (nbSlide < 0) {
        nbSlide = 4;
        }
      if (nbSlide > 4) {
        nbSlide = 0;
        }
      } else {
        if (nbSlide < 0) {
          nbSlide = 3;
          }
        if (nbSlide > 3) {
          nbSlide = 0;
      }
    }
    document.getElementById("slide1" + idSection).innerHTML = slide[nbSlide];
    document.getElementById("slide2" + idSection).innerHTML = slide[nbSlide + 1];
    document.getElementById("slide3" + idSection).innerHTML = slide[nbSlide + 2];
    document.getElementById("slide4" + idSection).innerHTML = slide[nbSlide + 3];
  }
  for (let i = 1; i < 3; i++) {  
    loadResults(FilmUrlList + "&page=" + i, allresultsCategoryFunc, false);
  }
  document.getElementById("slide1" + idSection).onclick = function() {
    loadResults(resultsLinksUrl[nbSlide], FilmResultsModale);
    modal.style.display = "block";
  }
  document.getElementById("slide2" + idSection).onclick = function() {
    loadResults(resultsLinksUrl[nbSlide + 1], FilmResultsModale);
    modal.style.display = "block";
  }
  document.getElementById("slide3" + idSection).onclick = function() {
    loadResults(resultsLinksUrl[nbSlide + 2], FilmResultsModale);
    modal.style.display = "block";
  }
  document.getElementById("prev" + idSection).onclick = function() {
    changeSlide(-1);
  }
  document.getElementById("next" + idSection).onclick = function() {
    changeSlide(+1);
  }
}
//run categories
const categories = [
  "Film les mieux notés",
  "Comedy",
  "Action",
  "Animation"
];

for (let category of categories) {
  Category(category);
}
