const { slugit } = require('../helpers')
const Page = require('../model/page')

const process = (req, res, path, template) => {
  req.checkBody('title', 'Title must not be blank.').notEmpty()
  req.checkBody('content', 'Content must not be blank.').notEmpty()

  req.body.slug = slugit(req.body.slug || req.body.title)
  req.body.errors = req.validationErrors()

  if (req.body.errors) {
    return res.render(template, req.body)
  }

  const is_new = req.body._id === undefined

  Page.persist(req.body)
    .then(() => {
      req.flash('success', `Page successfully ${is_new ? 'created' : 'updated'}.`)
      res.redirect(path)
    })
    .catch(errors => {
      if (errors === 404) {
        req.flash('danger', 'Page no longer exist.')
        res.redirect(path)
      } else {
        req.body.errors = errors
        res.render(template, req.body)
      }
    })
}

module.exports = {
  index: (req, res) => {
    Page.find({}).sort({ sorting: 1 }).exec((error, pages) => {
      res.render('admin/pages', { pages })
    })
  },

  new: (req, res) => {
    res.render('admin/add_page', { title: '', slug: '', content: '' })
  },

  create: (req, res) => {
    process(req, res, '/admin/pages', 'admin/add_page')
  },

  edit: (req, res) => {
    Page.findOne({ slug: req.params.slug }, (error, page) => {
      if (error) {
        return console.log(error)
      }
      if (page === null) {
        console.log('Page no longer exist.')
        res.redirect('/admin/pages')
      } else {
        res.render('admin/edit_page', page)
      }
    })
  },

  update: (req, res) => {
    process(req, res, '/admin/pages', 'admin/edit_page')
  },

  reorder: (req, res) => {
    Page.reorder(req.body['id[]'])
  }
}