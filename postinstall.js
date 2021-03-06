const fs = require('fs-extra')
const path = require('path')

// the source directory that this package is being installed into
const cwd = process.env.INIT_CWD

// if project has no content folder create it
// and populate with some example content
const contentFolder = 'content'
if(!fs.existsSync(path.join(cwd, contentFolder))) {

    fs.mkdirSync(path.join(cwd, contentFolder))
    fs.copySync(path.join(__dirname, contentFolder), path.join(cwd, contentFolder))
    console.log('Created "content" folder')
}


// if project has no layouts folder create it
// and populate with some example layouts
const layoutsFolder = 'layouts'
if(!fs.existsSync(path.join(cwd, layoutsFolder))) {

    fs.mkdirSync(path.join(cwd, layoutsFolder))
    fs.copySync(path.join(__dirname, layoutsFolder), path.join(cwd, layoutsFolder))

    console.log('Created "layouts" folder')
}

// if project has no assets folder create it
// and populate with some example assets
const assetsFolder = 'assets'
if(!fs.existsSync(path.join(cwd, assetsFolder))) {

    fs.mkdirSync(path.join(cwd, assetsFolder))
    fs.copySync(path.join(__dirname, assetsFolder), path.join(cwd, assetsFolder))

    console.log('Created "assets" folder')
}

// if there is a package.json file, add the espresso:serve script
const packageFile = path.join(cwd, 'package.json')
if(fs.existsSync(packageFile)) {
    let packageContents = JSON.parse(fs.readFileSync(packageFile))

    if(!packageContents.scripts) {
        packageContents.scripts = {}
    }

    packageContents.scripts['espresso:serve'] = 'node ./node_modules/espresso-site/server.js'
    packageContents.scripts['espresso:dev'] = 'node ./node_modules/espresso-site/dev.js'

    fs.writeFileSync(packageFile, JSON.stringify(packageContents, null, 2))

    console.log('Added "espresso:serve" and "espresso:dev" scripts to package.json')
}
else {
    console.log('No "package.json" found in project')
}


// see if there is a .env.js file, if not create it
const envFile = '.env.js'
if(!fs.existsSync(path.join(cwd, envFile))) {
    fs.createReadStream(path.join(__dirname, envFile)).pipe(fs.createWriteStream(path.join(cwd, envFile)))
}

// see if there is a config.js file, if not create it
const configFile = 'config.js'
if(!fs.existsSync(path.join(cwd, configFile))) {
    fs.createReadStream(path.join(__dirname, configFile)).pipe(fs.createWriteStream(path.join(cwd, configFile)))
}
