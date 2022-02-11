const CustomErrorClass = require("../error/custom-error-class");
const { StatusCodes } = require("http-status-codes");
const UserModel = require("../models/userModel");
const loginController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomErrorClass(
      "Please enter your username and password",
      StatusCodes.BAD_REQUEST
    );
  }
  const user = await UserModel.findOne({ username });
  if (!user) {
    throw new CustomErrorClass("UNAUTHORIZED", StatusCodes.UNAUTHORIZED);
  }
  const checkingPassword = await user.checkPassword(password);
  if (!checkingPassword) {
    throw new CustomErrorClass("UNAUTHORIZED", StatusCodes.UNAUTHORIZED);
  }
  const token = user.setToken();
  res.status(StatusCodes.OK).json({
    token,
  });
};

module.exports = {
  loginController,
};
