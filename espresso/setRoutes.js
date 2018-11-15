const deepmerge = require('deepmerge')

module.exports = (app, routes) => {

    app.locals.espresso.routes = routes

    Object.keys(routes).forEach(function(route) {

        app.get(route, function respond(req, res, next) {

            res.locals.site = deepmerge(app.locals.espresso.site || {}, {
                protocol: req.protocol,
                hostname: req.headers.host,
                url: req.originalUrl,
            })

            res.locals.page = deepmerge(app.locals.config.page, routes[route])

            next()

        })

    })

}
