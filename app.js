// the moves you can use are on this API, make a GET request to see all movies
const api= "https://scotch-mvplayer-api.herokuapp.com/api/v1";
let movies = [];
loadMovies();

function loadMovies() {
  var xhr = new XMLHttpRequest();
  xhr.onload = onLoadMovies;
  xhr.open("GET", api, true);
  xhr.send(); 
}

function onLoadMovies() {
  if (this.readyState == 4 && this.status == 200) {
    let response = JSON.parse(this.responseText);
    response.map(function(movie) { 
      movies.push(movie);
    });
    displayMovies();
  }
}

function displayMovies() {
  let html = [];
  movies.map(function(movie) {
    html.push(`
      <div onclick="openTrailer('${movie.trailer}')" class="trailer">
        <div class="overlay">
          <span>${movie.year}</span>
          <span>${movie.name}</span>
        </div>
        <img src="${movie.poster}">
      </div>
    `);
  });
  document.getElementById("video-choices").innerHTML = html.join('');
  openTrailer(movies[0].trailer);
}

function openTrailer(trailer) {
  document.getElementById('video-player').innerHTML = `<iframe src="${trailer}" width="100%" height="300px">`;
}