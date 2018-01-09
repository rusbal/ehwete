/**
 * Helpers
 */

module.exports = {
  slugit: (phrase) => {
    return (phrase).replace(/\s+/g, '-').toLowerCase()
  },
  c: (controllerAction, req, res, next) => {
    return (req, res, next) => {
      let [controller, action] = controllerAction.split('#')
      controller += 'Controller'
      const ctrl = require(`./controller/${controller}`)
      action = action || 'index'

      try {
        ctrl[action](req, res, next)
      } catch (e) {
        res.render('error/404', { controller, action })
      }
    }
  }
}