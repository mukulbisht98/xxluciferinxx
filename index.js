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

app.use(express.json())
app.use(require('./routes/auth'))

app.get('/',(req,res)=>{
    res.send("welcome to xxluciferinxx...")
})

const PORT = 5000
app.listen(PORT, () => {
    console.log("successful...open localhost:5000 on your browser...")
})