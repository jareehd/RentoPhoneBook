const mongoose = require('mongoose')
const validator = require('validator')

const contactSchema = new mongoose.Schema({
    name : {
        type :String,
        required:true
    } ,
    email: {
        type: String,
        required:true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    contactNumber : {
        type : String
    }
})

const Contact = mongoose.model( 'Contact' , contactSchema )

module.exports = Contact