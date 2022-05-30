const User = require('../../models/user/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../errors/index');

/* No need for try catch block as it is been handling at last--all possible errors */

const createNewUser = async (req, res) => {
  /* const user = new User(req.body) 
     await user.save()
    -->same as below code 
  */
  const user = await User.create({ ...req.body })
  const token = await user.generateAuthToken()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findByCredentials(req.body.email, req.body.password)
  const token = await user.generateAuthToken();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  createNewUser,
  loginUser
}