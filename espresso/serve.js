const express = require('express')
const app = require('./app.js')

module.exports = (config, espresso) => {

    const server = require('http').Server(
        app(config, espresso)
    )

    return server.listen(config.port, (err) => {
        if(err) {
            console.err(err)
        }
        else {
            console.log('Espresso Site is running on port %d', config.port)
        }
    })

}
