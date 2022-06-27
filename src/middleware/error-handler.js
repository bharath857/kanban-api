const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    output: err.message || 'Something went wrong',
    error: err
  }

  //optional can be removed
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  if (err.name === 'ValidationError') {
   /*  let outputString = ''
    Object.values(err.errors)
      .map((item) => {
        console.log(item.message)
        outputString = item.message + ', ' + outputString
      })
    customError.output = outputString   -------------------*/

    customError.output = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    customError.output = `Duplicate value entered for ${Object.keys(err.keyValue)} field, Please select another one`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  /* return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({msg:'Something went wrong',msg:err.message, error:err}) */
  return res.status(customError.statusCode).json({ output: customError.output, error: customError.error })
}

module.exports = errorHandlerMiddleware