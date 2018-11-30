import MovieService from "./movie-service.js"

let _mS = new MovieService()


function getMovie() {

}

function _drawMovie(movies) {
  console.log(movies)
}



export default class MovieController {
  constructor() {
    console.log('movie controller working')

  }
  searchMovie(event) {
    event.preventDefault()
    _mS.getMovie(event.target.search.value, _drawMovie)
  }
}