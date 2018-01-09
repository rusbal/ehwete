const express = require('express')
const router = express.Router()
const c = require('../helpers').c

router.get('/pages/', c('Page'))
router.get('/pages/new', c('Page#new'))
router.post('/pages/create', c('Page#create'))
router.get('/pages/edit/:slug', c('Page#edit'))
router.post('/pages/update/:slug', c('Page#update'))
router.delete('/pages/destroy/:id', c('Page#destroy'))
router.post('/pages/order', c('Page#reorder'))

router.get('/categories/', c('Category'))
router.get('/categories/new', c('Category#new'))
router.post('/categories/create', c('Category#create'))
router.get('/categories/edit/:slug', c('Category#edit'))
router.post('/categories/update/:slug', c('Category#update'))
router.delete('/categories/destroy/:id', c('Category#destroy'))

module.exports = router