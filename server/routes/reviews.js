let router = require('express').Router()
let Reviews = require('../models/review')
let Comments = require('../models/comment')

//get review and its comments
router.get('/', (req, res, next) => {
  Reviews.find({})
    .then(reviews => {
      let tmdbIds = []
      let count = 0
      reviews.forEach(review => {
        if (!tmdbIds.includes(review.tmdbId) && count < 10) {
          tmdbIds.push(review.tmdbId)
        }
      })
      res.send({
        tmdbIds, reviews
      })

    })
    .catch(next)
})

//get review and its comments
router.get('/:tmdbId', (req, res, next) => {
  Reviews.findById(req.params.tmdbId)
    .then(review => {
      Comments.find({ reviewId: review._id })
        .then(comments => {
          return res.send({ review, comments })
        })
    })
    .catch(next)
})

//post/create a new review
router.post('/', (req, res, next) => {
  req.body.userId = req.session.uid
  req.body.username = req.session.username
  Reviews.create(req.body)
    .then(review => {
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