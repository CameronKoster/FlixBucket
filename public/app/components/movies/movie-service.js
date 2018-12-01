import Movie from "./models/movie.js"
// @ts-ignore
let _movieAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/search',
  timeout: 3000
})

let _apiKey = "api_key=1acfaa233b759fc415e78d406552edcd&query="
let _movies = []

// @ts-ignore
let _flixbucketdb = axios.create({
  baseURL: 'mongodb://moviewatcher1:moviewatcher1@ds119164.mlab.com:19164/flixbucketdb',
  timeout: 3000
})


export default class MovieService {
  contructor() {
    console.log('movie service working')
  }
  getMovies(query, _drawMovie, handleError) {
    _movieAPI.get("/movie?" + _apiKey + query)
      .then(res => {
        let movies = res.data.results
        _drawMovie(movies)
      })
      .catch(err => {
        console.log(err)
      })
  }
  // getOurMovie(title, _drawMovie, getMovies) {
  //   _flixbucketdb.get(title)
  //     .then(res => {
  //       _movies = res.data.results
  //       _drawMovie()
  //     })
  //     .catch(this.getMovies())
  // }

}