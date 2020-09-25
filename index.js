const express = require('express')
const app = express()

const mongoose = require('mongoose')
const { MONGOURI } = require('./keys')

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('connected to mongodb')
})
mongoose.connection.on('error', (err) => {
    console.log('error: ', err)
})

require('./models/user')
require('./models/list')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/list'))

app.get('/',(req,res)=>{
    res.send("welcome to xxluciferinxx...")
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("successful...open localhost:5000/ on your browser...")
})