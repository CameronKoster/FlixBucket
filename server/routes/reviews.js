let router = require('express').Router()
let Reviews = require('../models/review')
let Comments = require('../models/comment')
let Movies = require('../models/movie')


//get review and its comments
router.get('/:movieId', (req, res, next) => {
  Reviews.findById(req.params.movieId)
    .then(review => {
      Comments.find({ reviewId: review._id })
        .then(comments => {
          return res.send({ review, comments })
        })
    })
    .catch(next)
})

//post/create a new review
router.post('/:movieId', (req, res, next) => {
  req.body.userId = req.session.uid
  Reviews.create(req.body)
    .then(review => {
      Movies.findOne({ _id: req.body.movieId })
        .then(movie => {
          movie.avgRating = req.body.avgRating
          movie.save()
        })
      res.send(review)
    })
    .catch(next)
})

//delete a review
router.delete('/:id', (req, res, next) => {
  Reviews.findOneAndUpdate({ _id: req.params.id, creatorId: req.session.uid }, { description: 'No longer Available', price: 0, img: 'http://placehold.it/200x200' })
    .then(review => res.send({ message: "DELORTED", data: review }))
    .catch(next)
})

//update/modify an existing review
router.put('/:id', (req, res, next) => {
  Reviews.findOneAndUpdate(req.params.id, req.body, { new: true })
    .then(review => res.send(review))
    .catch(next)
})

module.exports = router