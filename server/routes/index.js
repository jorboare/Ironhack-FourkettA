module.exports = app => {

    // Base URLS
    app.use('/api/recipes', require('./recipes.routes.js'))
    app.use('/api', require('./auth.routes.js'))
}