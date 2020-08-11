const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = mongoose.model("User")

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body

    if (!email || !name || !password)
        return res.status(422).json({ error: "feilds can not be empty." })

    User.findOne({ email }).then(savedUser => {
        if (savedUser)
            return res.status(422).json({ error: "Email already exists." })
        bcrypt.hash(password, 12)
            .then(hashedpassword => {
                const user = new User({ name, email, password: hashedpassword })
                user.save()
                    .then(user => {
                        res.json({ message: "signup successfull." })
                    }).catch(err => console.log(err))
            })
    }).catch(err => console.log(err))
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.status(422).json({ error: "feilds can not be empty." })

    User.findOne({ email })
        .then(savedUser => {
            if (!savedUser)
                return res.status(422).json({ error: "Invalid Email or password." })

            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser.id }, JWT_SECRET)
                        const { _id, name, email } = savedUser
                        res.json({ token, user: { _id, name, email } })
                    } else {
                        return res.status(422).json({ error: "Invalid Email or password." })
                    }
                })

        }).catch(err => console.log(err))
})

// router.post('/forgotpassword', (req, res) => {
//     const { email } = req.body

//     if (!email)
//         return res.status(422).json({ error: "feilds can not be empty." })

//     User.findOne({ email }).then(savedUser => {
//         if (savedUser.email == email) {
//         }
//     }).catch(err => console.log(err))
// })

module.exports = router