const jwt = require('jsonwebtoken')
const User = require('../models/user')

const { UnauthenticatedError } = require('../../errors/index')

const auth = async (req, res, next) => {
    const authHeader = req.header.authorization
    if(!authHeader && !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        let response = {
            success: false,
            error: 'Please authanticate.'
        }
        throw new UnauthenticatedError(response)
    }
}

module.exports = auth