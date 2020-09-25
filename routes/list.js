const express = require('express')
const { Mongoose } = require('mongoose')
const router = express.Router()

const mongoose = require('mongoose')
const { MONGOURI } = require('../keys')
const mongoClient = mongoose.MongoClient
const List = mongoose.model("List")

router.post('/list', (req, res) => {
    const { title, data } = req.body

    if (!title || !data)
        return res.status(422).json({ error: "feilds can not be empty." })
    List.findOne({ title }).then(savedData => {
        if (savedData)
            return res.status(422).json({ error: "Title already exists." })
        const list = new List({ title, data })
        list.save()
            .then(list => {
                res.json({ message: "data saved successfull." })
            }).catch(err => console.log(err))
    }).catch(err => console.log(err))
})

router.get('/list', (req, res) => {
    List.find()
    .then(list =>
        res.json({list})
    ).catch(err=>console.log(err))
})
module.exports = router