const { slugit } = require('../../helpers')

module.exports = {
  process: (req, res, Category, path, template) => {
    req.checkBody('title', 'Title must not be blank.').notEmpty()

    req.body.slug = slugit(req.body.slug || req.body.title)
    req.body.errors = req.validationErrors()

    if (req.body.errors) {
      return res.render(template, req.body)
    }

    const is_new = req.body._id === undefined

    Category.persist(req.body)
      .then(() => {
        req.flash('success', `Category successfully ${is_new ? 'created' : 'updated'}.`)
        res.redirect(path)
      })
      .catch(errors => {
        if (errors === 404) {
          req.flash('danger', 'Category no longer exist.')
          res.redirect(path)
        } else {
          req.body.errors = errors
          res.render(template, req.body)
        }
      })
  },

  delete: (req, res, Category, path) => {
    Category.findByIdAndRemove(req.params.id, (error, category) => {
      if (error) {
        req.flash('danger', `Failed attempt to delete category with id: ${req.params.id}`)
      } else {
        req.flash('info', `Category <b>${category.title}</b> was deleted.`)
      }
      res.redirect(path)
    })
  }
}