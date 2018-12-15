const express = require('express')
const chokidar = require('chokidar')

const serve = require('./serve.js')
const cwd = require('./cwd')

module.exports = (config, espresso) => {

    let server = serve(config, espresso)

    const watcher = chokidar.watch(cwd + '/content')

    watcher.on('ready', () => {
        watcher.on('all', (event, path) => {

            console.log('Changes detected ...')

            setTimeout(() => {
                server.close(() => {
                    console.log('Restarting server ...')
                    setTimeout(() => {
                        server = serve(config, espresso)
                    }, 500)
                })
            }, 500)

        });
    })

    return server

}
