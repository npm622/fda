if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureRouter.prod')
} else {
  module.exports = require('./configureRouter.dev')
}
