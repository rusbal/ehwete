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
}