const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { MONGOURI } = require('../keys')
const mongoClient = mongoose.MongoClient
const Posts = mongoose.model("Posts")

router.post('/post', (req, res) => {
    const { title, data } = req.body

    if (!title || !data)
        return res.status(422).json({ error: "feilds can not be empty." })
    Posts.findOne({ title }).then(savedData => {
        if (savedData)
            return res.status(422).json({ error: "Title already exists." })
        const Posts = new Posts({ title, data })
        Posts.save()
            .then(Posts => {
                res.json({ message: "data saved successfull." })
            }).catch(err => console.log(err))
    }).catch(err => console.log(err))
})

router.get('/posts', (req, res) => {
    Posts.find()
        .then(Posts =>
            res.json({ Posts })
        ).catch(err => console.log(err))
})
module.exports = router