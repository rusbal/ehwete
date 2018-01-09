const { slugit } = require('../../helpers')

module.exports = {
  process: (req, res, Page, path, template) => {
    req.checkBody('title', 'Title must not be blank.').notEmpty()
    req.checkBody('content', 'Content must not be blank.').notEmpty()

    req.body.slug = slugit(req.body.slug || req.body.title)
    req.body.errors = req.validationErrors()

    if (req.body.errors) {
      return res.render(template, req.body)
    }

    Page.persist(req.body)
      .then(() => {
        req.flash('success', `Page successfully ${req.body.id ? 'update' : 'create'}d.`)
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
  },

  delete: (req, res, Page, path) => {
    Page.findByIdAndRemove(req.params.id, (error, page) => {
      if (error) {
        req.flash('danger', `Failed attempt to delete page with id: ${req.params.id}`)
      } else {
        req.flash('info', `Page <b>${page.title}</b> was deleted.`)
      }
      res.redirect(path)
    })
  }
}