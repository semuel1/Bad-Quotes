// Modules and variables
const express = require('express')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')
const ejsLayouts = require('express-ejs-layouts')
const cryptoJS = require('crypto-js')
const db = require('./models')


const app = express()
const rowdyRes = rowdy.begin(app)
const PORT = process.env.PORT || 3000
//Middleware
app.use(morgan('tiny'))
app.set('view engine', 'ejs')
app.use(require('cookie-parser')())
app.use(express.static('public'))
app.use(express.urlencoded({ extended:false }))
app.use(ejsLayouts)


// //Controllers
app.use('/users', require('./controllers/userController'))
app.use('/characters', require('./controllers/characterController'))


// Routes

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