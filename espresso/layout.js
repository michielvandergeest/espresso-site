const path = require('path')
const indentString = require('indent-string')
const pug = require('pug')

module.exports = (req, res, next) => {

    const filename = path.join('layouts', res.locals.page.layout + '.pug')

    res.locals.filename = req.app.get('views')

    // if content doesn't *start* with a block, wrap everything (until a block is found) inside a default block called 'content'
    if(res.locals.page.content.substr(0,6).trim() != 'block') {
        const contentParts = res.locals.page.content.split("\nblock ")
        res.locals.page.content = 'block content' + "\n\n" + indentString(contentParts.shift(), 4)

        if(contentParts.length) {
            res.locals.page.content += 'block ' + contentParts.join("\nblock ")
        }
    }

    try {
        res.locals.html = pug.render('extends ' + filename + "\n\n" + res.locals.page.content, {...res.locals, ...req.app.locals.espresso})
        next()
    } catch(e) {
        next(e)
    }

}
