require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

// FOR DATA MIDDLEWARE
//Allows from Data to be processed into Req.body
app.use(express.urlencoded({extended: false}))
//tells express to recognize req.body as a json
app.use(express.json())
app.use(cors())

// include the bounties controller
app.use('/bounties', require('./controllers/bounties'))

app.get('/', (req, res)=> {
    res.send('You have hit the home route')
})
app.listen(process.env.PORT || 8000, ()=> {
console.log("yeeeessssss!")
})