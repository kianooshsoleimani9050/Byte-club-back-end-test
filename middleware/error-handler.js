const CustomErrorClass = require("../error/custom-error-class");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMW = (error, req, res, next) =>
  error instanceof CustomErrorClass
    ? res.status(error.statusCode).json({ message: error.message })
    : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
module.exports = {
  errorHandlerMW,
};
