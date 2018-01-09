const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  slug: {
    type: String
  }
})

const Category = mongoose.model('Category', CategorySchema)

/**
 * Private
 */
const create = (data) => {
  return new Promise((resolve, reject) => {
    Category.findOne({ title: data.title }, (error, category) => {
      if (error) {
        reject(error)
      } else {
        if (category) {
          reject('Category is already taken.  Please choose another.')
        } else {
          const category = new Category(data)
          category.save((error) => {
            if (error) {
              reject(error)
            } else {
              resolve(category)
            }
          })
        }
      }
    })
  })
}

const update = (data) => {
  return new Promise((resolve, reject) => {
    Category.findOne({ slug: data.slug, _id: { '$ne': data.id } }, (error, category) => {
      if (category) {
        reject("Category slug exists, choose another.")
      } else {
        Category.findById(data.id, (error, category) => {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            if (category) {
              category.title = data.title
              category.slug = data.slug

              category.save((error) => {
                if (error) {
                  reject(error)
                } else {
                  resolve(category)
                }
              })
            } else {
              console.log('id not found: ', data.id)
              reject(404)
            }
          }
        })
      }
    })
  })
}

/**
 * Public
 */
Category.persist = (data) => {
  return data.id ? update(data) : create(data)
}

module.exports = Category
