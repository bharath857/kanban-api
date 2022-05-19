const User = require('../../models/user')

const createNewUser = async (req, res) => {

    try {
        const user = await User.create(req.body);
        res.status(201).send(user)
    } catch(error){
        res.status(201).send(user)
    }

    
}

const loginUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}
module.exports = {
    createNewUser,
    loginUser
}