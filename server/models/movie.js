let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = "Movie"

let schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: String, required: true },
  tmdbId: { type: String, required: true },
  img: { type: String },
  cast: { type: String },
  director: { type: String },
  avgRating: { type: Number },
  review: [{ type: String }]
})


let model = mongoose.model(name, schema)

module.exports = model