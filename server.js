const path = require('path')

const cwd = require('./espresso/cwd.js')
const Espresso = require('./espresso/espresso.js')

const config = require(path.join(cwd, 'config.js'))

module.exports = Espresso.serve(config)
