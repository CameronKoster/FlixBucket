import MovieService from "./movie-service.js"

let _mS = new MovieService()
let _auth = {}

function handleError(err) {
  console.error("Sorry 0 results found", err)
}


function _drawMovie() {
  let movies = _mS.movies
  let template = ''
  movies.forEach(movie => {
    let imageUrl = "https://image.tmdb.org/t/p/w150_and_h150_bestv2" + movie.poster_path
    template += `
    <div class="card" style="width: 40rem;">
    <img class="card-img-start contain" src="${imageUrl}" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">${movie.overview}</p>
    <button class="btn btn-primary" onclick="app.controllers.movieController._drawReview(${movie.id})">See Reviews</button>
    </div>
    <div id="${movie.id}"></div>
    </div>
    
    `
  })
  document.getElementById('movieCard').innerHTML = template
  //_mS.getReviews()

}


//let movies = _mS.movies

export default class MovieController {
  constructor(auth) {
    _auth = auth
    _mS.getReviews(_drawMovie, handleError)
  }

  _drawReview(movieId) {
    let _reviews = _mS.reviews.filter(review => review.tmdbId == movieId)
    let template = ''
    _reviews.forEach(review => {
      template += `
    <div class="card" style="width: 40rem;">
    <div class="card-body">
    <h5 class="card-title">Review: ${review.content}</h5>
    <h5 class="card-subtitle mb-2">Rating: ${review.rating}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Author:${review.userId}</h6>
      <p class="card-text">comments: </p>
      <button type="button" class="btn btn-success btn-xs" onclick="app.controllers.movieController.showReviewForm('${review.tmdbId}')">Add Review</button>
    </div>
  </div>
    `
    });

    document.getElementById(`${movieId}`).innerHTML = template + `<div id='${movieId}form'></div>`
  }
  searchMovie(event) {
    event.preventDefault()
    //_mS.getMovies(event.target.search.value, _drawMovie, handleError)
  }

  showReviewForm(id) {
    let template = `
    <form onsubmit="app.controllers.movieController.addReview(event)">
      <input readonly name="tmdbId" value="${id}" hidden>
    <div class="form-group">
    <label for="review">Add Review</label>
    <textarea class="form-control" id="review" name="review" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-success btn-xs">submit</button>
    </form>
    `
    document.getElementById(`${id}form`).innerHTML = template
  }

  addReview(event) {
    event.preventDefault()
    let form = event.target
    let review = {
      tmdbId: form.tmdbId.value,
      content: form.review.value,
      rating: 5
    }
    _mS.addReview(review, this._drawReview)
    form.reset()
  }
  // getMovies() {
  //   _mS.getMovies(this._drawMovie, handleError)
  // }

}