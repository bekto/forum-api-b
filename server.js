const express = require('express')
const app = express()

//importing routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const resetRoute = require('./routes/reset')
const commRoute = require('./routes/comments')

//Middleware
app.use(express.json());

//Routes Middleware
app.use('/',authRoute)
app.use('/',postRoute)
app.use('/',resetRoute)
app.use('/',commRoute)

const port = 3000


app.listen(port, () => console.log(`Server listening on port ${port}!`))
