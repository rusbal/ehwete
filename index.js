/**
 * It all starts here.
 */

const config = require('./config/app')
const app = require('./sys/app')()

/**
 * Route files
 */
app.use('/admin', require('./app/routes/admin'))
app.use('/', require('./app/routes/root'))

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}.`)
})
