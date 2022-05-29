const User = require('../../models/user/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../../errors/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const createNewUser = async (req, res) => {
  /* const user = new User(req.body) 
     await user.save()
    -->same as below code 
  */

  const user = await User.create({ ...req.body })
  const token = await user.generateAuthToken()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const loginUser = async (req, res, next) => {
  /* return next(createCustomError(`under construction`, 404)) */
}
module.exports = {
  createNewUser,
  loginUser
}


/* const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  register,
  login,
} */