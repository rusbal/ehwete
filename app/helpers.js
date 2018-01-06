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
      const ctrl = require(`./controller/${controller}Controller`)
      action = action || 'index'
      ctrl[action](req, res, next)
    }
  }
}