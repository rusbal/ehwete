const Page = require('../model/page')
const h = require('./h/PageHelper')

module.exports = {
  index: (req, res) => {
    Page.find({}).sort({ sorting: 1 }).exec((error, pages) => {
      res.render('admin/page/list', { pages })
    })
  },

  new: (req, res) => {
    res.render('admin/page/add', { title: '', slug: '', content: '' })
  },

  create: (req, res) => {
    h.process(req, res, Page, '/admin/pages', 'admin/add_page')
  },

  edit: (req, res) => {
    Page.findOne({ slug: req.params.slug }, (error, page) => {
      if (error) {
        return console.log(error)
      }
      if (page === null) {
        req.flash('danger', `Page no longer exists.`)
        res.redirect('/admin/pages')
      } else {
        res.render('admin/page/edit', page)
      }
    })
  },

  update: (req, res) => {
    h.process(req, res, Page, '/admin/pages', 'admin/edit_page')
  },

  destroy: (req, res) => {
    h.delete(req, res, Page, '/admin/pages')
  },

  reorder: (req, res) => {
    Page.reorder(req.body['id[]'])
  }
}