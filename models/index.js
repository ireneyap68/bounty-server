const mongoose = require('mongoose')


mongoose.connect(process.env.ATLAS_URI||
process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

// shortcut to our mongoose.connection object
const db = mongoose.connection

// set up an event listener to fire once connection opens
//to concole.log what host and port it is running on
db.once('open', ()=>{
    console.log(`Connected MongoDb at ${db.host}:${db.port}`)
})

// set up an event listener to fire on database error and console.log
// the error object
db.on('error', (err)=>{
    console.log(`Database error:\n${err}`)
})

// Export all the things
module.exports.Bounty = require('./bounty')