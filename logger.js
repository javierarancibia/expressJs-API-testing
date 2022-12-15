// Middleware Function -- it gets res, req and next by default ---- I can send the response on the middleware function or use the Next option to go to the next middleware.
const logger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    next()  // Method to pass to the next middleware
}

module.exports = logger