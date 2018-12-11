const init = require('./init.js')
const getRoutes = require('./getRoutes.js')
const setRoutes = require('./setRoutes.js')
const found = require('./found.js')
const layout = require('./layout.js')
const branding = require('./branding.js')
const done = require('./done.js')
const error = require('./error.js')
const serve = require('./serve.js')
const watch = require('./watch.js')
const app = require('./app.js')

const espresso = {
    init,
    getRoutes,
    setRoutes,
    found,
    layout,
    branding,
    done,
    error,
}

module.exports = {

    espresso,
    serve(config) {
        return serve(config, espresso)
    },
    app(config) {
        return app(config, espresso)
    },
    watch(config) {
        return watch(config, espresso)
    },
}
