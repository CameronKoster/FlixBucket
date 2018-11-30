let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = "Review"

let schema = new Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  movieId: { type: String, required: true },
})



let model = mongoose.model(name, schema)

module.exports = model