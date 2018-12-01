let router = require('express').Router()
let Comments = require('../models/comment')
let Reviews = require('../models/review')


//get comment by id
router.get('/:reviewId', (req, res, next) => {
  Comments.findById(req.params.reviewId)
    .then(comment => res.send(comment))
    .catch(next)
})

//get comment and its reviews
router.get('/:reviewId/comments', (req, res, next) => {
  Comments.findById(req.params.reviewId)
    .then(comment => {
      Reviews.find({ commentId: comment._id })
        .then(reviews => {
          return res.send({ comment, reviews })
        })
    })
    .catch(next)
})

//post/create a new comment
router.post('/', (req, res, next) => {
  Comments.create(req.body)
    .then(comment => res.send(comment))
    .catch(next)
})

//delete a comment
router.delete('/:id', (req, res, next) => {
  Comments.findOneAndUpdate({ _id: req.params.id, creatorId: req.session.uid }, { description: 'No longer Available', price: 0, img: 'http://placehold.it/200x200' })
    .then(comment => res.send({ message: "DELORTED", data: comment }))
    .catch(next)
})

//update/modify an existing comment
router.put('/:id', (req, res, next) => {
  Comments.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(comment => res.send(comment))
    .catch(next)
})

module.exports = router