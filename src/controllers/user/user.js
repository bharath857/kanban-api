const User = require('../../models/user/user')
const asyncWrapper = require('../../middleware/async')
const { createCustomError } = require('../../errors/custom-error')


const createNewUser = asyncWrapper(async (req, res) => {
    //we can remove try catch as asyncWrapper is generilized
   /*  try {
        const user = await User.create(req.body);
        res.status(201).send(user)
    } catch (error) {
        res.status(201).send(user)
    } */
})

const loginUser = async (req, res, next) => {
    /* return next(createCustomError(`under construction`, 404)) */
}

const deleteUser = async (req, res) => {

}
module.exports = {
    createNewUser,
    loginUser
}