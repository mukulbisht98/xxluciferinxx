const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    // authorization === "Bearer er$%^aes34..."

    if (!authorization) return res.status(401).json({ error: "You need to be logged in." })

    const token = authorization.replace("Bearer ", "")

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) return res.status(401).json({ error: "You need to be logged in." })

        User.findById({ _id } = payload).then(userdata => {
            req.user = userdata
            next()
        })
    })
}