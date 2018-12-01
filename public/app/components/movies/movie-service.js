import Movie from "./models/movie.js"
import { callbackify } from "util";
// @ts-ignore
let _movieAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/search',
  timeout: 3000
})

let _apiKey = "api_key=1acfaa233b759fc415e78d406552edcd"
let _movies = []
let _reviews = []
// @ts-ignore
let _flixbucketdb = axios.create({
  baseURL: 'mongodb://moviewatcher1:moviewatcher1@ds119164.mlab.com:19164/flixbucketdb',
  timeout: 3000
})


export default class MovieService {
  contructor() {
    // this.getMovies()
  }
  getReviews(callback, handleError) {
    _flixbucketdb.get('/')
      .then(res => {
        let _reviews = res.data
        callback(_reviews)
      })
      .catch(err => {
        handleError()
      })
  }

  // get movies() {
  //   return _movies
  // }

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