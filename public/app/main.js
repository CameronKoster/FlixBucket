import MovieController from "./components/movies/movie-controller.js"
//import CommentController from "./components/comments/comment-controller.js"
//import ReviewController from "./components/reviews/review-controller.js"


class App {
  constructor() {
    this.controllers = {
      movieController: new MovieController(),
      //commentController: new CommentController(),
      //reviewController: new ReviewController()
    }
  }
}

// @ts-ignore
window.app = new App()