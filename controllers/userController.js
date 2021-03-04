const router = require('express').Router()
const models = require('../models')

router.get('/new', (req, res) => {
    res.render('users/new')
})

router.post('/', async (req, res) =>{
    const user = await models.user.create({
        username: req.body.username,
        password: req.body.password
    })
})

router.get('/login', async (req, res) => {
    res.render('users/login')
    // const user  = await models.findOne ({
    //     where: { username: req.body.username }
    // })
})

module.exports = router