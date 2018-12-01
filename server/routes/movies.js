let router = require('express').Router()
let Movies = require('../models/movie')
let Reviews = require('../models/review')

//GET ALL MOVIES
router.get('/', (req, res, next) => {
  Movies.find({})
    .then(movies => {
      let moviesHtoL =
        movies.sort((a, b) => parseInt(b.avgRating) - parseInt(a.avgRating))
      res.send(moviesHtoL)
    })
    .catch(next)
})

//get movie by id
router.get('/:id', (req, res, next) => {
  Movies.findOne({ _id: req.params.id })
    .then(movie => {
      Reviews.find({ movieId: req.params.id })
        .then(reviews => {
          res.send({ movie, reviews })
        }).catch(next)
    })
    .catch(next)
})

//get movie and its reviews
router.get('/:id/reviews', (req, res, next) => {
  Movies.findById(req.params.id)
    .then(movie => {
      Reviews.find({ movieId: movie._id })
        .then(reviews => {
          return res.send({ movie, reviews })
        })
    })
    .catch(next)
})

//post/create a new movie
router.post('/', (req, res, next) => {
  Movies.create(req.body)
    .then(movie => res.send(movie))
    .catch(next)
})

//delete a movie
router.delete('/:id', (req, res, next) => {
  Movies.findOneAndUpdate({ _id: req.params.id, creatorId: req.session.uid }, { description: 'No longer Available', price: 0, img: 'http://placehold.it/200x200' })
    .then(movie => res.send({ message: "DELORTED", data: movie }))
    .catch(next)
})

//update/modify an existing movie
router.put('/:id', (req, res, next) => {
  Movies.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(movie => res.send(movie))
    .catch(next)
})

module.exports = router