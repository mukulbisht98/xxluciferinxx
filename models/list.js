const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    data:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('List', listSchema)