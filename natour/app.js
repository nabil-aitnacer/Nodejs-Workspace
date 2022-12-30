const { json } = require('express')
const express = require('express')
const tourRouter = require('./routers/tour.router')
const logger = require('morgan')
const app = express()

//MiddleWare
app.use(logger('dev'))
app.use(express.json())

//Routers
app.use('/api/v1',tourRouter)


app.listen(3000, () => {
    console.log('Server listening on port 3000')
})
