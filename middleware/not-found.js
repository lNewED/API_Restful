const notFound = (req, res, next) => {
    res.status(404).send('route does not exist!')
    next()
}

module.exports = notFound;