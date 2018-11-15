module.exports = (err, req, res, next) => {

    res.locals.page = {
        layout: 'error',
        title: 'Error',
        content: 'div.error ' + err.toString(),
    }

    res.status(err.status || 500)
    next()

}
