const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bounties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bounty'
    }]
})

module.exports = mongoose.model('Department', departmentSchema)