import Movie from "./models/movie.js"
// @ts-ignore
let _movieAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/search',
  timeout: 3000
})

let _apiKey = "?api_key=1acfaa233b759fc415e78d406552edcd"
let _movies = []
let _reviews = []
// @ts-ignore
let _flixbucketdb = axios.create({
  baseURL: '/api/reviews',
  timeout: 3000
})

function getMoviesFromReviews(drawMovies, tmdbIds) {
  Promise.all(
    tmdbIds.map(getMovieById)
  ).then(() => {
    console.log("Movies and Reviews Ready", _movies, _reviews)
    drawMovies()
  })
}

function getMovieById(id) {
  return _movieAPI.get("https://api.themoviedb.org/3/movie/" + id + _apiKey)
    .then(res => {
      _movies.push(res.data)
    })
}
function handleError(err) {
  throw new Error(err)
}


export default class MovieService {
  getReviews(drawMovies, handleError) {
    return _flixbucketdb.get('/')
      .then(res => {
        _reviews = res.data.reviews
        if (drawMovies) {
          getMoviesFromReviews(drawMovies, res.data.tmdbIds)
        }
      })
      .catch(err => {
        if (handleError) {
          handleError()
        }
      })
  }
  addReview(review, draw) {
    _flixbucketdb.post("", review)
      .then(res => {
        _reviews.push(res.data)
        draw(review.tmdbId)
      })
      .catch(handleError)
  }

  get movies() {
    return _movies
  }
  get reviews() {
    return _reviews
  }

}


// getMovies(query, callback, handleError) {
//   _movieAPI.get("&query=" + "/movie?" + _apiKey + query)
//     .then(res => {
//       console.log(res.data.results)
//       let _movies = res.data.results
//       callback(_movies)
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }