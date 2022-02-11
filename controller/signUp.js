const { StatusCodes } = require("http-status-codes");
const UserModel = require("../models/userModel");

const signUpController = async (req, res) => {
  const { name, username, password } = req.body;
  const user = await UserModel.create({ name, username, password });
  res
    .status(StatusCodes.CREATED)
    .json({ name: user.name, token: user.setToken() });
};
module.exports = { signUpController };
