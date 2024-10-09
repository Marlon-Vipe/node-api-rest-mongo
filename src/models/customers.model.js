const mongoose = require('mongoose')

const  customerSchema = new mongoose.Schema(
    {
        name: String,
        lastname: String,
        age: Number,
        gender: String,
        bornDate: Date,
        email: String,
    }
)

module.exports = mongoose.model('Customer', customerSchema)