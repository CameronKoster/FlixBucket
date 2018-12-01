let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let name = "Review"

let schema = new Schema({
  userId: { type: ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  movieId: { type: String, ref: "Movie", required: true },
})



let model = mongoose.model(name, schema)

module.exports = model