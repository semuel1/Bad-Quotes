const router = require('express').Router()
const models = require('../models')
const db = require('../models')
const bcrypt = require('bcrypt')
const AES = require('crypto-js/aes')

router.get('/new', (req, res) => {
    res.render('users/new')
})

router.get('/results', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})

router.get('/login', async (req, res) => {
    res.render('users/login')
})

router.post('/', async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)

    try {
        if(!req.body.username || !req.body.password) {
            res.render('users/new', { errors: 'Try Again'})
            return;
        }


        const user = await db.user.create({
            username: req.body.username,
            password: hashedPassword
        })

        console.log(res.locals.user)

        const encryptedId = AES.encrypt(user.id.toString(), process.env.COOKIE_SECRET).toString()
        res.cookie('userId', encryptedId)
        res.redirect('/')
    } catch (err) {
        console.log( err)
        res.render('users/new', { errors: 'Try Again'})
    }
})


router.post('/login', async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: { username: req.body.username }
        })

        if(user && bcrypt.compareSync(req.body.password, user.password)) {
            const encryptedId = AES.encrypt(user.id.toString(), process.env.COOKIE_SECRET).toString()
            res.cookie('userId', encryptedId)
            res.redirect('/')
        } else {
            res.render("users/login", { errors: "Try again" })
        }

    } catch (err) {
        console.log(err)
        res.render('users/login', { errors: "Try Again" })
    }
})

module.exports = router