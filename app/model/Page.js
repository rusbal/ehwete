const mongoose = require('mongoose')

const PageSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  slug: {
    type: String
  },
  content: {
    type: String,
    require: true
  },
  sorting: {
    type: Number
  }
})

const Page = mongoose.model('Page', PageSchema)

/**
 * Private
 */
const create = (data) => {
  return new Promise((resolve, reject) => {
    Page.findOne({ slug: data.slug }, (error, page) => {
      if (error) {
        reject(error)
      } else {
        if (page) {
          reject('Slug is already taken.  Please choose another.')
        } else {
          const page = new Page(data)
          page.save((error) => {
            if (error) {
              reject(error)
            } else {
              resolve(page)
            }
          })
        }
      }
    })
  })
}

const update = (data) => {
  return new Promise((resolve, reject) => {
    Page.findById(data._id, (error, page) => {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        if (page) {
          page.title = data.title
          page.slug = data.slug
          page.content = data.content
          page.sorting = data.sorting

          page.save((error) => {
            if (error) {
              reject(error)
            } else {
              resolve(page)
            }
          })
        } else {
          reject(404)
        }
      }
    })
  })
}

/**
 * Public
 */
Page.reorder = (ids) => {
  let idx = 0
  ids.forEach(id => {
    Page.findById(id, (error, page) => {
      page.sorting = idx
      page.save((error) => {
        if (error) {
          console.log(error)
        }
      })
      idx += 1
    })
  })
}

Page.persist = (data) => {
  if (data._id) {
    return update(data)
  } else {
    return create(data)
  }
}

module.exports = Page
