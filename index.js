/**
 * It all starts here.
 */

const config = require('./config/app')
const app = require('./sys/app')()

app.use('/admin/pages', require('./app/routes/admin'))
app.use('/', require('./app/routes/root'))
app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}.`)
})
