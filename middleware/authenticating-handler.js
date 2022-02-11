const CustomErrorClass = require("../error/custom-error-class");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const authorizationMW = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new CustomErrorClass("Token not provided", StatusCodes.UNAUTHORIZED);
  }
  const token = authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const { userId, username } = decodedToken;
    req.userInfo = { userId, username };
    next();
  } catch (error) {
    throw new CustomErrorClass("Not Authorized", StatusCodes.UNAUTHORIZED);
  }
};
module.exports = authorizationMW;
