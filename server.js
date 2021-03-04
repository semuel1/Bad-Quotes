// Modules and variables
const express = require('express')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')
const ejsLayouts = require('express-ejs-layouts')
const app = express()
const rowdyRes = rowdy.begin(app)

const PORT = process.env.PORT || 3000
//Middleware
app.use(morgan('tiny'))
app.set('view engine', 'ejs')
app.use(require('cookie-parser')())
app.use(express.static('public'))
app.use(ejsLayouts)

// //Controllers
app.use('/users', require('./controllers/userController'))
// Routes

app.get('/search', (req, res) => {
    ///Axios.get to BB API - req.body.(nameofinput) - results of axios get put into results
    try {
        const badCharacter = 'https://breakingbadapi.com/documentation/api/characters/1'
        const response = await req.body(badCharacter)
    
    } catch (err) {
        console.log(err)
    }
})


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    rowdyRes.print()
})