const Category = require('../model/category')
const h = require('./h/CategoryHelper')

module.exports = {
  index: (req, res) => {
    Category.find({}).sort({ sorting: 1 }).exec((error, categories) => {
      res.render('admin/category/list', { categories })
    })
  },

  new: (req, res) => {
    res.render('admin/category/add', { title: '' })
  },

  create: (req, res) => {
    h.process(req, res, Category, '/admin/categories', 'admin/category/add')
  },

  edit: (req, res) => {
    Category.findById(req.params.id, (error, category) => {
      if (error) {
        return console.log(error)
      }
      if (category === null) {
        req.flash('danger', `Category no longer exists.`)
        res.redirect('/admin/categories')
      } else {
        res.render('admin/category/edit', category)
      }
    })
  },

  update: (req, res) => {
    h.process(req, res, Category, '/admin/categories', 'admin/category/edit')
  },

  destroy: (req, res) => {
    h.delete(req, res, Category, '/admin/categories')
  },

  reorder: (req, res) => {
    Category.reorder(req.body['id[]'])
  }
}