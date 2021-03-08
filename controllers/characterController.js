const router = require('express').Router()
const { default: axios } = require('axios')
const db = require('../models')

router.post('/', async (req, res) => {
    try {
        const [newCharacter, created] = await db.badCharacter.findOrCreate({
            where: { 
                name: req.body.name 
            }
        })
        // console.log(created);
        res.locals.user.addCharacter(newCharacter);
        res.redirect(`/results`)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router