let router = require('express').Router()
let Reviews = require('../models/review')


//get review and its reviews
router.get('/:movieId/reviews', (req, res, next) => {
  Reviews.findById(req.params.movieId)
    .then(review => {
      Reviews.find({ reviewId: review._id })
        .then(reviews => {
          return res.send({ review, reviews })
        })
    })
    .catch(next)
})

//post/create a new review
router.post('/', (req, res, next) => {
  Reviews.create(req.body)
    .then(review => res.send(review))
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
  Reviews.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(review => res.send(review))
    .catch(next)
})

module.exports = router