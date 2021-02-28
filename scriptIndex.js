/* Requests AJAX*/
function loadResults(url, functionUrl) {

  fetch(url).then(function(response) {
      return response.json().then(
        function (data) {
          return functionUrl(data);
        })
  })
  .catch(function(error) {
    console.log(error.message);
  });
}

//Best film request
let bestFilmUrlList = "http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score";
let bestFilmUrl;
function bestFilmUrlFunc(result) {
  bestFilmUrl = result.results[0].url;   
  loadResults(bestFilmUrl, bestFilmResultMainPage);
}
function bestFilmResultMainPage(result){
  document.getElementById("bestFilmImage").innerHTML = "<img src=" + result.image_url + "alt='Best Film Image' height='400' width='300'/>";
  document.getElementById("bestFilmTitle").innerHTML = result.original_title;
  document.getElementById("bestFilmDescription").innerHTML = result.description;
}
loadResults(bestFilmUrlList, bestFilmUrlFunc);
let btn = document.getElementById("boutonInfo");
btn.onclick = function() {
  loadResults(bestFilmUrl, FilmResultsModale);
  modal.style.display = "block";
}

//Modal Results
function FilmResultsModale(result){
    document.getElementById("filmImage").innerHTML = "<img src=" + result.image_url + "alt='Best Film Image' />";
    document.getElementById("original_title").innerHTML = result.original_title;
    document.getElementById("genres").innerHTML = result.genres;
    document.getElementById("date_published").innerHTML = result.date_published;
    document.getElementById("rated").innerHTML = result.rated;
    document.getElementById("imdb_score").innerHTML = result.imdb_score;
    document.getElementById("directors").innerHTML = result.directors;
    document.getElementById("actors").innerHTML = result.actors;
    document.getElementById("duration").innerHTML = result.duration + ' min';
    document.getElementById("countries").innerHTML = result.countries;
    document.getElementById("worldwide_gross_income").innerHTML = result.worldwide_gross_income + ' entrées';
    document.getElementById("long_description").innerHTML = result.long_description;
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
function makeCategory(category){
  let genre = '';
  let idSection;
  let FilmUrlList;
  if (category != "Film les mieux notés"){
    genre = category;
    idSection = genre;
    FilmUrlList = "http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score&genre=" + genre;
    }else{
      FilmUrlList = "http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score";
      idSection = 'bestFilms'
    }
  let section = document.createElement("section");
  let nav = document.createElement("a");
  const resultsImagesUrl = [];
  const resultsLinksUrl = [];
  const picturesSlides = [];
  let nbSlide = 0;
  const urlList = []

  //Make Title and block category
  nav.setAttribute("href", '#'+ idSection);
  nav.textContent = category;   
  document.getElementById("navigation").appendChild(nav);
  section.setAttribute("class", "category");
  section.setAttribute("id", idSection);
  document.getElementById("blockPage").appendChild(section);
  let p = document.createElement("p");
  p.setAttribute("class", "titleCategory");
  p.setAttribute("id", idSection + 'Title');
  section.appendChild(p);
  let h1 = document.createElement("h1");
  h1.textContent = category; 
  document.getElementById(idSection + 'Title').appendChild(h1);

  //Create slide block and arrows elements 
  let divSlider = document.createElement("div");
  divSlider.setAttribute("id", idSection + "List");
  divSlider.setAttribute("class", "list");
  let divControlPrev = document.createElement("div");
  let divControlNext = document.createElement("div");
  divControlPrev.setAttribute("id", "prev" + idSection);
  divControlPrev.setAttribute("class", "prev");
  divControlPrev.textContent = "<";
  divControlNext.setAttribute("id", "next" + idSection);
  divControlNext.setAttribute("class", "next");
  divControlNext.textContent = ">";
  divSlider.appendChild(divControlPrev);

  //Create and insert slides blocks and preview arrow into slide block  
  for (let i=1; i<5; i++){
    let divSlide = document.createElement("div");
    divSlide.setAttribute("id", "slide" + i + idSection);
    divSlide.setAttribute("class", "slide slide" + i);
    divSlider.appendChild(divSlide);
  }
  section.appendChild(divSlider);
  divSlider.appendChild(divControlNext);

  // List of urls
  for (i=1; i<3; i++){
    urlList.push(FilmUrlList + "&page="+ i);
  }
  getAllUrls(urlList, resultsImagesUrl, resultsLinksUrl, picturesSlides, idSection);
 
  for (let i=1; i<5; i++){
    document.getElementById("slide"+ i + idSection).onclick = function() {
      if (nbSlide + (i-1) !== 7){
        loadResults(resultsLinksUrl[nbSlide + (i-1)], FilmResultsModale);
      modal.style.display = "block";
      } else {
        loadResults(resultsLinksUrl[0], FilmResultsModale);
      modal.style.display = "block";
      } 
    }
  }
  
  document.getElementById("prev" + idSection).onclick = function() {
    nbSlide = changeSlide(-1, nbSlide)
    displayPictureSlide(idSection, picturesSlides, nbSlide);
  }
  document.getElementById("next" + idSection).onclick = function() {
    nbSlide = changeSlide(+1, nbSlide)
    displayPictureSlide(idSection, picturesSlides, nbSlide);
    console.log(nbSlide)
  }
}

//Change slide Category
function changeSlide(direction, nbSlide) {
  nbSlide = nbSlide + direction;
  if (window.matchMedia("(max-width: 1280px)").matches) {
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
  return nbSlide;
}

// Request category films
async function getAllUrls(urlList, resultsImagesUrl, resultsLinksUrl, picturesSlides, idSection) { 
  try {
      let data = await Promise.all(
        urlList.map(
              url =>
                  fetch(url).then(
                      (response) => response.json()
                  ).then(
                    function (data) {
                      return data;})
                  )
      );
      for (element of data){
        for (let i = 0; i < 5; i++) {
          resultsImagesUrl.push(element.results[i].image_url);  
          resultsLinksUrl.push(element.results[i].url);  
        }
      }
  
      if (resultsImagesUrl.length > 7) {
        for (let i = 0; i < 7; i++) {
          picturesSlides.push("<img src=" + resultsImagesUrl[i] + "alt='Category Film Image/>");
        }
      }
  } catch (error) {
      console.log(error)
      throw (error)
  }
  displayPictureSlide(idSection, picturesSlides, 0);
  
}
// Display category films
function displayPictureSlide(idSection, picturesSlides, nbSlide){
  for (let i=1; i<5; i++){
    if (nbSlide + (i - 1) !== 7){
    document.getElementById("slide"+ i + idSection).innerHTML = picturesSlides[nbSlide + (i - 1)];
    } else {
      document.getElementById("slide"+ i + idSection).innerHTML = picturesSlides[0];
    }
  }
}

// Generate categories
const categories = [
  "Film les mieux notés",
  "Comedy",
  "Action",
  "Animation"
];

for (let category of categories) {
  makeCategory(category);
}
