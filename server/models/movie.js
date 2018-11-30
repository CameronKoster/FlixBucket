let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = "Movie"

let schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: Number, required: true },
  img: { type: String },
  cast: { type: String },
  director: { type: String },
  tmdbId: { type: String, required: true },
  avgrating: { type: Number },
  review: [{ type: String }]
})





let model = mongoose.model(name, schema)

module.exports = model