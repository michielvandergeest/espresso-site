const path = require('path')
const indentString = require('indent-string')
const pug = require('pug')
const readdir = require('recursive-readdir-sync')
const fs = require('fs')

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
        res.locals.html = pug.render(
            addModules(
                req, res,
                'extends ' + filename + "\n\n" + res.locals.page.content
            ), {...res.locals, ...req.app.locals.espresso}
        )
        next()
    } catch(e) {
        next(e)
    }

}

const addModules = (req, res, content) => {

    const moduleFiles = readdir(path.join(__dirname, 'modules'))

    // 1. Add scripts
    res.locals.scripts = {}

    moduleFiles.filter(function(script) {
        return script.indexOf('.js') > -1
    }).forEach(function(script) {
        const scriptName = path.basename(script).split('.').shift()
        res.locals.scripts[scriptName] = require(script)
    })

    // 2. Add mixins
    const mixins = moduleFiles.filter(function(mixin) {
        return mixin.indexOf('.pug') > -1
    }).map(function(mixin) {
        return fs.readFileSync(mixin, 'UTF-8')
    }).join("\r\n")

    // break up the content in lines
    let contentParts = content.split(/\r?\n/)

    // add the includes at the beginning, or on the second line if the content start with an 'extends'
    // (which has to be the first statement of a pug file)
    contentParts.splice(
        contentParts[0].startsWith('extends') ? 1 : 0,
        0, mixins
    )

    // glue everything back together and return it
    return contentParts.join("\r\n")

}
