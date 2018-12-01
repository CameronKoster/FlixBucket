let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let name = "Comment"

let schema = new Schema({
  userId: { type: ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  reviewId: { type: ObjectId, ref: "Review", required: true }
})


let model = mongoose.model(name, schema)

module.exports = model