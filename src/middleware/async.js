
//asyncWrapper used for common try catch but generally  " express-async-errors " this package will take of all unhandled erros 
const asyncWrapper = (callback) => {
    return async (req, res, next) => {
        try {
            await callback(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper