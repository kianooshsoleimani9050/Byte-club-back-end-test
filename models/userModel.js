const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
});
UserSchema.pre("save", async function () {
  const bcryptSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, bcryptSalt);
});
UserSchema.methods.setToken = function () {
  const token = jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_EXPIERESIN,
    }
  );
  return token;
};

UserSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("UserModel", UserSchema);
