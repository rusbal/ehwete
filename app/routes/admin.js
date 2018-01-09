const express = require('express')
const router = express.Router()
const c = require('../helpers').c

router.get('/', c('Page'))
router.get('/add-page', c('Page#new'))
router.post('/add-page', c('Page#create'))
router.get('/edit-page/:slug', c('Page#edit'))
router.post('/edit-page/:slug', c('Page#update'))
router.get('/delete-page/:id', c('Page#destroy'))
router.post('/reorder-pages', c('Page#reorder'))

module.exports = router