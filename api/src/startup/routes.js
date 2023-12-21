require('express-async-errors')
const { json } = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')

module.exports = function (app) {
  app.use(helmet())
  app.use(compression())
  app.use(cors())
  app.use(json())
  app.use(morgan('dev'))

  app.use('/api/users', require('../routes/users'))
  app.use('/api/projects', require('../routes/projects'))
  app.use('/api/skills', require('../routes/skills'))

  app.get('/health', (req, res) => {
    res.send({ status: 'ok' })
  })

  app.get('/ping', (req, res) => {
    res.send({ success: true })
  })

  app.use(require('../middlewares/errors'))
}
