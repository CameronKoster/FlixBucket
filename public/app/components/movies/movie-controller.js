import MovieService from "./movie-service.js"

let _mS = new MovieService()

function handleError(err) {
  console.error("Sorry 0 results found")
}


function _drawMovie(_movies) {
  let template = ''
  console.log(_movies)
  _movies.forEach(movie => {
    let imageUrl = "https://image.tmdb.org/t/p/w150_and_h150_bestv2" + movie.poster_path
    template += `
    <div class="card" style="width: 18rem;">
    <img class="card-img-start contain" src="${imageUrl}" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">${movie.overview}</p>
    <a href="#" class="btn btn-primary">See Reviews</a>
    </div>
    </div>
    `
  })
  document.getElementById('movieCard').innerHTML = template
  //_mS.getReviews()

}

function _drawReviews(_reviews) {
  let template = ''
  _reviews.forEach(review => {
    template += `
    
    `
  });
}

//let movies = _mS.movies

export default class MovieController {
  constructor() {
    _mS.getReviews(_drawMovie, handleError)
  }

  searchMovie(event) {
    event.preventDefault()
    _mS.getMovies(event.target.search.value, _drawMovie, handleError)
  }
  // getMovies() {
  //   _mS.getMovies(this._drawMovie, handleError)
  // }

}