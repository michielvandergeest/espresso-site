const path = require('path')
const fs = require('fs')
const cwd = require('./cwd.js')

module.exports = (req, res, next) => {

    const regex = /\/(favicon|(apple-)?touch-icon(-i(phone|pad))?(-\d{2,}x\d{2,})?(-precomposed)?)\.(jpe?g|png|ico|gif)$/i

    if(regex.test(req.url)) {

        let pathToFavicon = path.join(cwd, 'assets', req.url)

        if(fs.existsSync(pathToFavicon)) {
            res.sendFile(pathToFavicon)
        }
        else {
            res.status(404).end();
        }
    }
    else {
        next()
    }

}
