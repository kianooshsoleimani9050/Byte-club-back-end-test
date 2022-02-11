const express = require("express");
const router = express.Router();
const { loginController } = require("../controller/login");
const { signUpController } = require("../controller/signUp");
//routes
router.route("/sign-up").post(signUpController);
router.route("/login").post(loginController);

module.exports = router;
