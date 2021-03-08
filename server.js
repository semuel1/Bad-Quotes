// Modules and variables
require('dotenv').config()
const express = require('express')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')
const methodOverride = require('method-override')
const ejsLayouts = require('express-ejs-layouts')
const cryptoJS = require('crypto-js')
const bcrypt = require('bcrypt')
const db = require('./models')


const app = express()
const rowdyRes = rowdy.begin(app)
const PORT = process.env.PORT || 3000
//Middleware
app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(require('cookie-parser')())
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended:false }))
app.use(ejsLayouts)



// Routes
app.use(async (req, res, next) => {
    console.log(req.cookies)
    if (req.cookies.userId != 'undefined') {
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.COOKIE_SECRET).toString(cryptoJS.enc.Utf8)
        
        
        // const user = await db.user.findByPk(decryptedId)
        const user = await db.user.findOne({
            where: {
                id: decryptedId
            }
        })
        
        res.locals.user = user
    } else {
        res.locals.user = null
    }
    
    next()
})

// //Controllers
app.use('/users', require('./controllers/userController'))
app.use('/characters', require('./controllers/characterController'))

app.get('/profile', async (req, res) => {
    res.render('users/profile')
})

app.get('/results', async (req, res) => {
    // /Axios.get to BB API - req.body.(nameofinput) - results of axios get put into results
    try {
        const name = req.query.name

        const badUrl = `https://www.breakingbadapi.com/api/characters?name=${name}`
        const response = await axios.get(badUrl)

        const badCharacter = response.data[0]
        console.log(badCharacter)
        
        if( badCharacter === undefined ) {
          
        }else {
              badCharacter === response.data[0];
              res.render('results', { badCharacter: badCharacter })
        }

        
    } catch (err) {
        console.log(err)
        res.render('results', { badCharacter: [] })
    }
    
})

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    rowdyRes.print()
})