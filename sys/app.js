const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')

module.exports = () => {
  require('./db').setup()
  const app = express()
  const rootpath = process.cwd()

  app.set('views', path.join(rootpath, 'app/views'))
  app.set('view engine', 'ejs')

  app.use(express.static(path.join(rootpath, 'public')))

  app.locals.errors = null

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

  app.use(expressValidator())

  app.use(require('connect-flash')())
  app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res)
    next();
  })

  return app
}