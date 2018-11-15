module.exports = (req, res, next) => {

    if(!res.locals.page) {
        next(new Error('404 - Not found'))
    }
    next()

}
