const express = require('express')
const router = express.Router()
const c = require('../helpers').c

router.get('/pages/', c('Page'))
router.get('/pages/new', c('Page#new'))
router.post('/pages/new', c('Page#create'))
router.get('/pages/edit/:id', c('Page#edit'))
router.post('/pages/edit/:id', c('Page#update'))
router.delete('/pages/destroy/:id', c('Page#destroy'))
router.post('/pages/order', c('Page#reorder'))

router.get('/categories/', c('Category'))
router.get('/categories/new', c('Category#new'))
router.post('/categories/new', c('Category#create'))
router.get('/categories/edit/:id', c('Category#edit'))
router.post('/categories/edit/:id', c('Category#update'))
router.delete('/categories/destroy/:id', c('Category#destroy'))

module.exports = router