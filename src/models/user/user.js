const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const { UnauthenticatedError } = require('../../errors/index')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 8,
        maxlength: 40,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    dob: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now
    },
    phoneNumber: {
        type: Number,
        required: true,
        minlength: 10
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ "email": email })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    return user
}

//has the password before saving
userSchema.pre('save', async function (next) {
    console.log('save')
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User

/* tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    } */