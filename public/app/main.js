import MovieController from "./components/movies/movie-controller.js"
import AuthController from "./components/auth/auth-controller.js"
import AuthService from "./components/auth/auth-service.js"
//import CommentController from "./components/comments/comment-controller.js"

let auth = new AuthService()

class App {
  constructor() {
    this.controllers = {
      authContoller: new AuthController(auth),
      movieController: new MovieController(auth),
      //commentController: new CommentController(),
    }
  }
}

// @ts-ignore
window.app = new App()