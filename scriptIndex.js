/* Refresh page */
setInterval('window.location.reload()', 600000);

/* Requests AJAX Best Film*/
let requestBestFilm = new XMLHttpRequest();
let requestBestFilmUrl = new XMLHttpRequest();

requestBestFilm.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        requestBestFilmUrl.open("GET", response.results[0].url);
        requestBestFilmUrl.send();
        requestBestFilmUrl.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                let response = JSON.parse(this.responseText);
                document.getElementById('bestFilmText').innerHTML =  "<img src="+response.image_url +"alt='Best Film' />";    
            }
        };
        
    }
};

requestBestFilm.open("GET", "http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score");
requestBestFilm.send();


