const mongoose = require('mongoose')
const connectionString = 'mongodb://moviewatcher1:moviewatcher1@ds119164.mlab.com:19164/flixbucketdb'
const connection = mongoose.connection

mongoose.connect(connectionString, { useNewUrlParser: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})