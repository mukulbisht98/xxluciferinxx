const express = require('express')
const app = express()

const mongoose = require('mongoose')

const dotenv = require('dotenv')
const helmet = require("helmet")
const morgan = require("morgan")

const list = require('./models/list')
const post = require('./models/post')
const user = require('./models/user')
const listRoute = require("./routes/list")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")
const { MONGOURI } = require('./keys')

dotenv.config()

mongoose.connect(process.env.MONGOURI || MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('connected to mongodb')
})
mongoose.connection.on('error', (err) => {
    console.log('error: ', err)
})

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(list)
app.use(post)
app.use(user)
app.use("/api/user", authRoute)
app.use("/api/user", listRoute)
app.use("/api/user", postRoute)
// app.use(require('./middleware/requireLogin'))

app.get('/', (req, res) => {
    res.send("welcome to xxluciferinxx server...")
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server running successfully...open port ${port} on your browser...`)
})