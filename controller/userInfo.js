const { StatusCodes } = require("http-status-codes");
const UserModel = require("../models/userModel");
const userInfoController = async (req, res) => {
  const { userId, username } = req.userInfo;
  const user = await UserModel.findById(userId);
  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  userInfoController,
};
