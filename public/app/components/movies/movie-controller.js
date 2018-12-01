import MovieService from "./movie-service.js"

let _mS = new MovieService()

function handleError(err) {
  console.error("Sorry 0 results found")
}

function _drawMovie(movies) {
  console.log(movies);
  let template = ''
  movies.forEach(movie => {
    let imageUrl = "https://image.tmdb.org/t/p/w150_and_h150_bestv2" + movie.poster_path
    template += `
    <div class="card" style="width: 18rem;">
    <img class="card-img-start contain" src="${imageUrl}" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">${movie.overview}</p>
    <a href="#" class="btn btn-primary">Add Review</a>
    </div>
    </div>
    `
  });
  document.getElementById('movieCard').innerHTML = template
}



export default class MovieController {
  constructor() {

  }
  searchMovie(event) {
    event.preventDefault()
    _mS.getMovies(event.target.search.value, _drawMovie)
  }
  getMovies() {
    _mS.getMovies(_drawMovie, handleError)
  }
  // getOurMovie(id, getMovies) {
  //   _mS.getOurMovie(id, _drawMovie, getMovies)
  // }
}