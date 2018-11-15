const fs = require('fs')
const path = require('path')
const fileExtension = require('file-extension')
const md = require('markdown-it')()
const readdir = require('recursive-readdir-sync')
const cwd = require('./cwd')

module.exports = () => {

    const routes = {}

    readdir(path.join(cwd, '/content/')).forEach(function(file) {

        const fileContent = fs.readFileSync(file, 'utf-8')

        const fileContentParts = fileContent.split('====')

        if(fileContentParts) {
            const page = JSON.parse(fileContentParts.shift())

            page.content = fileContentParts[0] || ''

            if(page.skip) {
                return
            }

            if(fileExtension(file) === 'md') {
                page.content = md.render(page.content)
            }

            if(page.slug) {
                routes[page.slug] = page
            }
        }

    })

    return routes

}
