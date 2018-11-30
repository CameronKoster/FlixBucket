import Movie from "./models/movie.js"

// @ts-ignore
let _movieAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/search',
  timeout: 3000
})

let _apiKey = "api_key=1acfaa233b759fc415e78d406552edcd&query="

let _movies = []

export default class MovieService {
  contructor() {
    console.log('movie service working')

  }
  getMovie(query, _drawMovie) {
    _movieAPI.get("/movie?" + _apiKey + query)
      .then(res => {
        _drawMovie(res.data.results)
      })
  }


}