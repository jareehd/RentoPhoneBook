const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required:true,
        trim: true,
    }
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user)  throw new Error('Either email or password is incorrect')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Either email or password is incorrect')
    return user
}

userSchema.pre('save' , async function(next){
    if(this.isModified('password')) this.password = await bcrypt.hash(this.password,8)
    next()
})

const User =  mongoose.model('User',userSchema)

module.exports = User