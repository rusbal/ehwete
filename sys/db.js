const mongoose = require('mongoose')
const config = require('../config/database')

module.exports = {
  setup() {
    mongoose.connect(config.database)
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('Connected to MongoDB.')
    })
  }
}