const express = require('express')

module.exports = (config, espresso) => {

    const app = express()

    espresso.init(app, config)
    espresso.setRoutes(app, espresso.getRoutes())

    app.use(espresso.found, [espresso.layout, espresso.branding, espresso.done])
    app.use([espresso.error, espresso.layout, espresso.done])

    return app

}
